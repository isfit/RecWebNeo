using HotChocolate;
using HotChocolate.Types;
using RecAPI.Sections.Repositories;
using RecAPI.Sections.Models;
using RecAPI.Sections.InputType;
using RecAPI.Generic.InputType;

namespace RecAPI.Sections.Mutations
{
    [ExtendObjectType(Name= "Mutation")]
    public class SectionMutations
    {
        public Section CreateSection(
            CreateSectionInput input,
            [Service]ISectionRepository repository
        )
        {
            var section = new Section(
                input.Name,
                input.Description
            );
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