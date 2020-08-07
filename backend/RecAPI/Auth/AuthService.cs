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

namespace RecAPI.Auth.Repositories
{
    public class AuthService : IAuthService
    {

        public string RegisterUser(string email, string password, [Service] IAuthRepository authRepository)
        {
            AuthError.UniqueEmailError(authRepository, email, null);
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            string passwordHash = Convert.ToBase64String(
                KeyDerivation.Pbkdf2(
                    password: password,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA1,
                    iterationCount: 10000,
                    numBytesRequested: 256 / 8
                )
            );

            var authUser = new AuthUser()
            {
                Email = email,
                PassHash = passwordHash,
                Salt = salt
            };
            return authRepository.RegisterUser(authUser);
        }

        // https://medium.com/@marcinjaniak/graphql-simple-authorization-and-authentication-with-hotchocolate-11-and-asp-net-core-3-162e0a35743d
        public string Authenticate(string email, string password, [Service] IAuthRepository authRepository)
        {
            var authUser = authRepository.GetAuthUserByEmail(email);
            if (authUser == null)
            {
                AuthError.CredentialsError();
                return null;
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

            if (authUser.PassHash == passwordHash)
            {
                var roles = new List<string>();
                roles.Add("member");
                return GenerateAccessToken(authUser.Email, authUser.Id, roles.ToArray());
            }
            // TODO: Throw error
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
                expires: DateTime.Now.AddDays(90),
                signingCredentials: signingCredentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}