using HotChocolate;
using HotChocolate.Types;
using RecAPI.Sections.Repositories;
using RecAPI.Sections.Models;
using RecAPI.Sections.InputType;
using RecAPI.Generic.InputType;
using RecAPI.Organizations.Repositories;
using HotChocolate.Execution;

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
            [Service]ISectionRepository repository
        )
        {
            var section = repository.GetSection(input.Id);
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