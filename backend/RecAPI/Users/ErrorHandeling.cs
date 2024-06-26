﻿using HotChocolate;
using HotChocolate.Execution;
using RecAPI.Sections.Repositories;
using RecAPI.Organizations.Repositories;
using Microsoft.AspNetCore.Http;

namespace RecAPI.Users.ErrorHandling
{
    public class UserError
    {
        public static void UserExistError(string email)
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("The user "+ email.ToString() +" does not exist!").Build());
        }

        public static void UserNotAvailableError(string email)
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("The user "+ email.ToString() +" is not available at that time.").Build());
        }

        public static void NoUsersExist()
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("The database corrently does not contain any users").Build());
        }
    }
}