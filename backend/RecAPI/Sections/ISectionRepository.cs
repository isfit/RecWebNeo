using System.Collections.Generic;
using RecAPI.Sections.Models;

namespace RecAPI.Sections.Repositories
{
    public interface ISectionRepository
    {
        IEnumerable<Section> GetSections();
        IEnumerable<Section> GetSections(List<string> ids);
        Section GetSection(string id);
        Section AddSection(Section section);
        Section UpdateSection(string id, Section section);
        bool DeleteSection(string id);
        // TODO: Husk å håndtere hva som skjer når en seksjon slettes og posisjoner og teams fortsatt finnes
    }
}