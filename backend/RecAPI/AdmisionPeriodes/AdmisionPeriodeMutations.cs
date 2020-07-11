using System;
using HotChocolate;
using HotChocolate.Types;
using RecAPI.AdmisionPeriodes.Repositories;
using RecAPI.Organizations.Repositories;
using RecAPI.AdmisionPeriodes.Models;
using RecAPI.AdmisionPeriodes.InputType;
using RecAPI.Generic.InputType;
using HotChocolate.Execution;

namespace RecAPI.AdmisionPeriodes.Mutations
{
    [ExtendObjectType(Name= "Mutation")]
    public class AdmisionPeriodeMutations
    {
        public AdmisionPeriode CreateAdmisionPeriode(
            CreateAdmisionPeriodeInput input,
            [Service]IAdmisionPeriodeRepository repository,
            [Service]IOrganizationRepository _organization
        )
        {
            var organizationExist = _organization.GetOrganization(input.Organization) != null;
            if (!organizationExist){
                throw new QueryException(ErrorBuilder.New().SetMessage("Organization does not exist!").Build());
            }
            var admisionPeriode = new AdmisionPeriode()
            {
                Organization = input.Organization,
                StartDate = input.StartDate,
                EndDate = input.EndDate,
            };
            return repository.CreateAdmisionPeriode(admisionPeriode);
        }

        public AdmisionPeriode UpdateAdmisionPeriode(
            UpdateAdmisionPeriodesInput input,
            [Service]IAdmisionPeriodeRepository repository,
            [Service]IOrganizationRepository _organization
        )
        {
            var organizationExist = _organization.GetOrganization(input.Organization) != null;
            if (!organizationExist){
                throw new QueryException(ErrorBuilder.New().SetMessage("Organization does not exist!").Build());
            }
            var admisionPeriode = new AdmisionPeriode()
            {
                Organization = input.Organization,
                StartDate = input.StartDate,
                EndDate = input.EndDate,
            };
            return repository.CreateAdmisionPeriode(admisionPeriode);
        }

        public bool DeleteAdmisionPeriode(
            SingleModelInput input,
            [Service]IAdmisionPeriodeRepository repository
        )
        {
            return repository.DeleteAdmisionPeriode(input.Id);
        }
    }
}