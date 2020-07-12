using System;
using HotChocolate;
using HotChocolate.Types;
using RecAPI.Organizations.Repositories;
using RecAPI.Organizations.Models;
using RecAPI.Organizations.InputType;
using RecAPI.Generic.InputType;
using HotChocolate.Execution;

namespace RecAPI.Generic
{
    public class OrganizationError
    {
        public static void UniqueNameError(IOrganizationRepository repository, string name, string oldName)
        {
            var organizationNameExist = name?.ToLower() == oldName?.ToLower() ? false : repository.GetOrganizationByName(name) != null;
            if (organizationNameExist)
            {
                throw new QueryException(ErrorBuilder.New().SetMessage("Organization name already exist!").Build());
            }
        }
    } 
}