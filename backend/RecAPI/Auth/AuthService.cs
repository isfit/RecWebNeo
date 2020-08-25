using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using RecAPI.Auth.Models;
using RecAPI.Auth.ErrorHandling;
using RecAPI.Database;
using MongoDB.Driver;
using HotChocolate;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography.X509Certificates;
using System.Security.Cryptography;
using System.Linq.Expressions;
using RecAPI.Users.ErrorHandling;

// https://medium.com/@marcinjaniak/graphql-simple-authorization-and-authentication-with-hotchocolate-11-and-asp-net-core-3-162e0a35743d
// https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies?view=aspnetcore-3.1
// https://docs.microsoft.com/en-us/aspnet/core/security/authorization/iauthorizationpolicyprovider?view=aspnetcore-3.1

namespace RecAPI.Auth.Repositories
{
    public class AuthService : IAuthService
    {

        private byte[] GenerateSalt()
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }

        private string GeneratePasswordHash(string password, byte[] salt)
        {
            string passwordHash = Convert.ToBase64String(
                KeyDerivation.Pbkdf2(
                    password: password,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA1,
                    iterationCount: 10000,
                    numBytesRequested: 256 / 8
                )
            );
            return passwordHash;
        }

        public string RegisterUser(string email, string password, [Service] IAuthRepository authRepository)
        {
            AuthError.UniqueEmailError(authRepository, email, null);
            byte[] salt = GenerateSalt();
            string passwordHash = GeneratePasswordHash(password, salt);

            var authUser = new AuthUser()
            {
                Email = email,
                PassHash = passwordHash,
                Salt = salt
            };
            return authRepository.RegisterUser(authUser);
        }

        public bool AuthenticateUserInformation(string email, string password, [Service] IAuthRepository authRepository)
        {
            var authUser = authRepository.GetAuthUserByEmail(email);
            if (authUser == null)
            {
                AuthError.CredentialsError();
                return false;
            }
            string passwordHash = Convert.ToBase64String(
                KeyDerivation.Pbkdf2(
                    password: password,
                    salt: authUser.Salt,
                    prf: KeyDerivationPrf.HMACSHA1,
                    iterationCount: 10000,
                    numBytesRequested: 256 / 8
                )
            );
            return passwordHash == authUser.PassHash;
        }

        public string Authenticate(string email, string password, [Service] IAuthRepository authRepository)
        {
            bool userInfoAuthenticated = AuthenticateUserInformation(email, password, authRepository);
            if (userInfoAuthenticated)
            {
                var authUser = authRepository.GetAuthUserByEmail(email);
                var roles = authUser.Roles;
                if (roles == null)
                {
                    roles = new List<string>();
                }
                return GenerateAccessToken(authUser.Email, authUser.Id, roles.ToArray());
            }
            AuthError.CredentialsError();
            return null;
        }

        private string GenerateAccessToken(string email, string userId, string[] roles)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("3AEC6D497DDADC59A3496BF158FDC"));

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim(ClaimTypes.Name, email)
            };

            claims = claims.Concat(roles.Select(role => new Claim(ClaimTypes.Role, role))).ToList();


            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                "issuer",
                "audience",
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: signingCredentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public bool EditPassword(string email, string newPassword, [Service] IAuthRepository authRepository)
        {
            var authUser = authRepository.GetAuthUserByEmail(email);
            if (authUser == null)
            {
                UserError.UserExistError(email);
            }
            byte[] salt = GenerateSalt();
            string passwordHash = GeneratePasswordHash(newPassword, salt);
            var updatedUser = new AuthUser()
            {
                Id = authUser.Id,
                Email = authUser.Email,
                Roles = authUser.Roles,
                Salt = salt,
                PassHash = passwordHash
            };
            var newUpdatedUser = authRepository.UpdateAuthUser(authUser.Id, updatedUser);
            if (newUpdatedUser.PassHash == passwordHash)
            {
                return true;
            }
            AuthError.CredentialsError();
            return false;
        }

        public bool EditPassword(string id, string oldPassword, string newPassword, [Service] IAuthRepository authRepository)
        {
            var authUser = authRepository.GetAuthUser(id);
            if (authUser == null)
            {
                AuthError.CredentialsError();
            }
            bool userInfoAuthenticated = AuthenticateUserInformation(authUser.Email, oldPassword, authRepository);
            if (userInfoAuthenticated)
            {
                byte[] salt = GenerateSalt();
                string passwordHash = GeneratePasswordHash(newPassword, salt);
                var updatedUser = new AuthUser()
                {
                    Id = authUser.Id,
                    Email = authUser.Email,
                    Roles = authUser.Roles,
                    Salt = salt,
                    PassHash = passwordHash
                };
                var newUpdatedUser = authRepository.UpdateAuthUser(authUser.Id, updatedUser);
                if (newUpdatedUser.PassHash == passwordHash)
                {
                    return true;
                }
                return false;
            }
            AuthError.CredentialsError();
            return false;
        }
        
    }
}