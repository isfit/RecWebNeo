using System.Collections.Generic;
using RecAPI.Sections.Models;

namespace RecAPI.Sections.Repositories
{
    public interface ISectionRepository
    {
        IEnumerable<Section> GetSections();
        IEnumerable<Section> GetSections(List<string> ids);
        IEnumerable<Section> GetSectionsByOrganization(string organizationId);
        Section GetSection(string id);
        Section GetSectionByName(string name);
        Section AddSection(Section section);
        Section UpdateSection(string id, Section section);
        bool DeleteSection(string id);
        // TODO: Husk å håndtere hva som skjer når en seksjon slettes og posisjoner og teams fortsatt finnes
    }
}