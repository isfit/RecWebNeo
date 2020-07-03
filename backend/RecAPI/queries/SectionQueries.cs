using System;
using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using RecAPI.Repositories;
using RecAPI.Models;
using RecAPI.InputType;
namespace RecAPI.Queries
{
    [ExtendObjectType(Name = "Query")]
    public class SectionQueries
    {
        public IEnumerable<Section> GetSections(
            [Service]ISectionRepository repository
        ) =>
        repository.GetSections();

        public Section GetSection(
            SingleModelInput input,
            [Service]ISectionRepository repository
        ) =>
        repository.GetSection(input.Id);
    }
}