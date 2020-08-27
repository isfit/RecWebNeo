using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using RecAPI.Auth.Models;
using RecAPI.Auth.Repositories;
using RecAPI.Generic.InputType;
using RecAPI.Sections.ErrorHandling;
using RecAPI.Sections.Models;
using RecAPI.Sections.Repositories;
using RecAPI.Teams.ErrorHandling;
using RecAPI.Teams.Repositories;
using RecAPI.Users.ErrorHandling;
using RecAPI.Users.Input;
using RecAPI.Users.Models;
using RecAPI.Users.Repositories;

namespace RecAPI.Users.Mutations
{
    [ExtendObjectType(Name = "Mutation")]
    public class UserMutation
    {
        public string Login(
            string email,
            string password,
            [Service] IAuthService authService,
            [Service] IAuthRepository authRepository
        )
        {
            return authService.Authenticate(email, password, authRepository);
        }

        public bool RegisterUser(
            RegisterUserInput registerUser,
            [Service] IAuthService authService,
            [Service] IAuthRepository authRepository,
            [Service] IUserRepository userRepository
        )
        {
            var authUserId = authService.RegisterUser(registerUser.Email, registerUser.Password, authRepository);
            registerUser.Password = null;
            var user = new User()
            {
                AuthId = authUserId,
                Email = registerUser.Email,
                PhoneNumber = registerUser.PhoneNumber,
                FirstName = registerUser.FirstName,
                LastName = registerUser.LastName,
                BirtDate = registerUser.BirtDate,
                Approved = registerUser.Email.Contains("@isfit.no")
            };
            var storedUser = userRepository.CreateUser(user);
            if (storedUser != null)
            {
                return true;
            }
            return false;
        }


        [Authorize]
        public User EditUserInformation(
            [GlobalState("currentUser")] CurrentUser user,
            UpdateUserInput input,
            [Service] IUserRepository userRepository,
            [Service] IAuthRepository authRepository
        )
        {
            var userEmail = authRepository.GetUserEmail(user.UserId);
            var prevUser = userRepository.GetUserByEmail(userEmail);
            if (prevUser == null)
            {
                UserError.UserExistError(userEmail);
            }
        User updatedUser = new User()
        {
            Id = prevUser.Id,
            AuthId = prevUser.AuthId,
            Email = prevUser.Email,
            PhoneNumber = input.PhoneNumber ?? prevUser.PhoneNumber,
            FirstName = input.FirstName ?? prevUser.FirstName,
            LastName = input.LastName ?? prevUser.LastName,
            BirtDate = input.BirtDate ?? prevUser.BirtDate,
            BusyTime = input.BusyTime ?? prevUser.BusyTime,
            InterviewTime = prevUser.InterviewTime,
            Sections = prevUser.Sections,
            Teams = prevUser.Teams,
            Approved = prevUser.Approved
            };
            return userRepository.UpdateUser(prevUser.Id, updatedUser);
        }


        // Edit password
        [Authorize]
        public bool UpdateMyPassword(
            [GlobalState("currentUser")] CurrentUser user,
            UserUpdatePasswordInput passwordInput,
            [Service] IAuthService authService,
            [Service] IAuthRepository authRepository
        )
        {
            return authService.EditPassword(user.UserId, passwordInput.oldPassword, passwordInput.newPassword, authRepository);
        }

        [Authorize(Policy = "administrator")]
        public bool UpdateUserPassword(
            [GlobalState("currentUser")] CurrentUser user,
            string email,
            string newPassword,
            [Service] IAuthService authService,
            [Service] IAuthRepository authRepository
        )
        {
            var requestingUser = authRepository.GetAuthUser(user.UserId);
            var updatingUser = authRepository.GetAuthUserByEmail(email);
            if (requestingUser == null || updatingUser == null)
            {
                UserError.UserExistError(email);
            }
            if (updatingUser.Roles != null && (updatingUser.Roles.Contains("superuser") && !requestingUser.Roles.Contains("superuser")))
            {
                UserError.UserExistError(email);
            }
            return authService.EditPassword(email, newPassword, authRepository);
        }


        [Authorize(Policy ="superuser")]
        public bool DeleteUser(
            SingleModelInput input,
            [Service] IUserRepository userRepository,
            [Service] IAuthRepository authRepository
        )
        {
            var user = userRepository.GetUser(input.Id);
            var deletedAuthUser = authRepository.DeleteUser(user.AuthId);
            if (!deletedAuthUser)
            {
                return false;
            }
            return userRepository.DeleteUser(input.Id);
        }

        /*
        [Authorize]
        public bool DeleteMe(
            [GlobalState("currentUser")] CurrentUser user,
            [Service] IUserRepository userRepository,
            [Service] IAuthRepository authRepository
        )
        {
            var userEmail = authRepository.GetUserEmail(user.UserId);
            var userId = userRepository.GetUserByEmail(userEmail).Id;
            var deletedAuthUser = authRepository.DeleteUser(user.UserId);
            if (!deletedAuthUser)
            {
                return false;
            }
            return userRepository.DeleteUser(userId);
        }
        */


        [Authorize(Policy = "administrator")]
        public bool SetUserRole(
            string email,
            string role,
            [GlobalState("currentUser")] CurrentUser user,
            [Service] IAuthRepository authRepository
        )
        {
            return authRepository.SetRoleOfUser(user.UserId, email, role);
        }

        [Authorize(Policy = "administrator")]
        public bool SetSectionsToUser(
            string email,
            List<string> sections,
            [Service] IUserRepository userRepository,
            [Service] ISectionRepository sectionRepository
        )
        {
            var user = userRepository.GetUserByEmail(email);
            if (user == null)
            {
                UserError.UserExistError(email);
            };
            if (user.Sections == null)
            {
                user.Sections = new List<string>();
            };
            sections.ForEach( section => {
                var sectionObject = sectionRepository.GetSection(section);
                if (sectionObject == null)
                {
                    SectionsError.SectionExistError(section);
                }
            });
            user.Sections = sections;
            var updatedUser = userRepository.UpdateUser(user.Id, user);
            return !sections.Except(updatedUser.Sections).Any();
        }

        [Authorize(Policy = "administrator")]
        public bool SetTeamsToUser(
            string email,
            List<string> teams,
            [Service] IUserRepository userRepository,
            [Service] ITeamRepository teamRepository
        )
        {
            var user = userRepository.GetUserByEmail(email);
            if (user == null)
            {
                UserError.UserExistError(email);
            }
            if (user.Teams == null)
            {
                user.Teams = new List<string>();
            }
            teams.ForEach(team => {
                var teamObject = teamRepository.GetTeam(team);
                if (teamObject == null)
                {
                    TeamError.TeamExistError(team);
                }
            });
            user.Teams = teams;
            var updatedUser = userRepository.UpdateUser(user.Id, user);
            return !teams.Except(updatedUser.Teams).Any();
        }

        [Authorize(Policy = "superuser")]
        public bool setUserApproved(
                string email,
                bool approved,
                [Service] IUserRepository userRepository
            )
        {
            var user = userRepository.GetUserByEmail(email);
            if (user == null)
            {
                UserError.UserExistError(email);
            }
            user.Approved = approved;
            var updatedUser = userRepository.UpdateUser(user.Id, user);
            return updatedUser.Approved == approved;
        }

        [Authorize(Policy = "superuser")]
        public bool setAllUsersApproved(
                [Service] IUserRepository userRepository
            )
        {
            var users = userRepository.GetUsers();
            if (users == null && users.Count() == 0)
            {
                UserError.NoUsersExist();
            }
            foreach(User user in users)
            {
                user.Approved = true;
                var updatedUser = userRepository.UpdateUser(user.Id, user);
            }
            return true;
        }

    }
}