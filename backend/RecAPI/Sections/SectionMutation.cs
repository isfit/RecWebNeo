using HotChocolate;
using HotChocolate.Types;
using RecAPI.Sections.Repositories;
using RecAPI.Sections.Models;
using RecAPI.Sections.InputType;
using RecAPI.Generic.InputType;
using RecAPI.Organizations.Repositories;
using HotChocolate.Execution;
using RecAPI.Sections.ErrorHandeling;
using RecAPI.Generic;

namespace RecAPI.Sections.Mutations
{
    [ExtendObjectType(Name= "Mutation")]
    public class SectionMutations
    {
        public Section CreateSection(
            CreateSectionInput input,
            [Service]ISectionRepository repository,
            [Service]IOrganizationRepository _organization
        )
        {
            // Error handling
            SectionsError.UniqueNameError(repository, input.Name, null);
            SectionsError.OrganizationExists(_organization, input.Organization);

            var organization = _organization.GetOrganization(input.Organization);
            if (organization == null)
            {
                throw new QueryException(ErrorBuilder.New().SetMessage("Linked Organization does not exist").Build());
            }
            var section = new Section()
            {
                Name = input.Name,
                Description = input.Description,
                Organization = input.Organization
            };
            return repository.AddSection(section);
        }

        public Section UpdateSection(
            UpdateSectionInput input,
            [Service]ISectionRepository repository,
            [Service]IOrganizationRepository _organization
        )
        {
            // Error handling
            var section = repository.GetSection(input.Id);
            SectionsError.UniqueNameError(repository, section.Name, input.Name);
            if (input.Organization != null)
            {
                SectionsError.OrganizationExists(_organization, input.Organization);
            }

            section.Name = input.Name ?? section.Name;
            section.Description = input.Description ?? section.Description;
            section.Organization = input.Organization ?? section.Organization;
            return repository.UpdateSection(input.Id ,section);
        }

        public bool DeleteSection(
            SingleModelInput input,
            [Service]ISectionRepository repository
        )
        {
            return repository.DeleteSection(input.Id);
        }
    }
}