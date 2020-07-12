using HotChocolate;
using HotChocolate.Types;
using RecAPI.AdmisionPeriodes.Repositories;
using RecAPI.Organizations.Repositories;
using RecAPI.AdmisionPeriodes.Models;
using RecAPI.AdmisionPeriodes.InputType;
using RecAPI.Generic.InputType;
using RecAPI.AdmisionPeriodes.ErrorHandling;

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
            // Error checking
            AdmisionPeriodeError.OrganizationExists(_organization, input.Organization);
            AdmisionPeriodeError.ValidDates(input.StartDate, input.EndDate);

            var admisionPeriode = new AdmisionPeriode()
            {
                Organization = input.Organization,
                StartDate = input.StartDate,
                EndDate = input.EndDate
            };
            return repository.CreateAdmisionPeriode(admisionPeriode);
        }

        public AdmisionPeriode UpdateAdmisionPeriode(
            UpdateAdmisionPeriodesInput input,
            [Service]IAdmisionPeriodeRepository repository,
            [Service]IOrganizationRepository _organization
        )
        {
            // Error checking
            AdmisionPeriodeError.OrganizationExists(_organization, input.Organization);
            var admisionPeriode = repository.GetAdmisionPeriode(input.Id);
            var startDate = input.StartDate != null ? input.StartDate : admisionPeriode.StartDate;
            var endDate = input.EndDate != null ? input.EndDate : admisionPeriode.EndDate;
            AdmisionPeriodeError.ValidDates(startDate, endDate);

            var updateAdmisionPeriode = new AdmisionPeriode()
            {
                Id = admisionPeriode.Id,
                Organization = input.Organization ?? admisionPeriode.Organization,
                StartDate = startDate,
                EndDate = endDate
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