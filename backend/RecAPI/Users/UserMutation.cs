using System;
using System.Collections.Generic;
using System.Linq;
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
                FirstName = registerUser.FirstName,
                LastName = registerUser.LastName,
                BirtDate = registerUser.BirtDate
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
            User updatedUser = new User()
            {
                FirstName = input.FirstName ?? prevUser.FirstName,
                LastName = input.LastName ?? prevUser.LastName,
                BirtDate = input.BirtDate ?? prevUser.BirtDate,
                BusyTime = input.BusyTime ?? prevUser.BusyTime,
                Sections = prevUser.Sections,
                Teams = prevUser.Teams
            };
            return userRepository.UpdateUser(prevUser.Id, updatedUser);
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

        [Authorize(Policy = "administrator")]
        public bool SetRole(
            string email,
            string role,
            [GlobalState("currentUser")] CurrentUser user,
            [Service] IAuthRepository authRepository
        )
        {
            return authRepository.SetRoleOfUser(user.UserId, email, role);
        }


        [Authorize(Policy = "administrator")]
        public bool AddSections(
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
            }
            sections.ForEach( section => {
                var sectionObject = sectionRepository.GetSection(section);
                if (sectionObject == null)
                {
                    SectionsError.SectionExistError(section);
                } else
                {
                    user.AddSection(section);
                }
            });
            var updatedUser = userRepository.UpdateUser(user.Id, user);
            return !sections.Except(updatedUser.Sections).Any();
        }

        [Authorize(Policy = "administrator")]
        public bool RemoveSections(
            string email,
            List<string> sections,
            [Service] IUserRepository userRepository
        )
        {
            var user = userRepository.GetUserByEmail(email);
            if (user == null)
            {
                UserError.UserExistError(email);
            }
            sections.ForEach(section => 
                    user.RemoveSection(section)
                    );
            var updatedUser = userRepository.UpdateUser(user.Id, user);
            return !sections.Any(sec => updatedUser.Sections.Contains(sec));
        }



        [Authorize(Policy = "administrator")]
        public bool AddTeams(
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
            teams.ForEach(team => {
                var teamObject = teamRepository.GetTeam(team);
                if (teamObject == null)
                {
                    TeamError.TeamExistError(team);
                }
                else
                {
                    user.AddTeam(team);
                }
            });
            var updatedUser = userRepository.UpdateUser(user.Id, user);
            return !teams.Except(updatedUser.Teams).Any();
        }

        [Authorize(Policy = "administrator")]
        public bool RemoveTeams(
            string email,
            List<string> teams,
            [Service] IUserRepository userRepository
        )
        {
            var user = userRepository.GetUserByEmail(email);
            if (user == null)
            {
                UserError.UserExistError(email);
            }
            teams.ForEach(team =>
                    user.RemoveTeam(team)
                    );
            var updatedUser = userRepository.UpdateUser(user.Id, user);
            return !teams.Any(team => updatedUser.Sections.Contains(team));
        }

    }
}