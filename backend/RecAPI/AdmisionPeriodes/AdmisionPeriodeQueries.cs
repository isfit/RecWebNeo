using System;
using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using RecAPI.AdmisionPeriodes.Repositories;
using RecAPI.AdmisionPeriodes.Models;
using RecAPI.Generic.InputType;

namespace RecAPI.AdmisionPeriodes.Queries
{
    [ExtendObjectType(Name = "Query")]
    public class AdmisionPeriodeQueries
    {
        public IEnumerable<AdmisionPeriode> GetAdmisionPeriodes(
            [Service]IAdmisionPeriodeRepository repository
        ) =>
        repository.GetAdmisionPeriodes();

        public AdmisionPeriode GetAdmisionPeriode(
            SingleModelInput input,
            [Service]IAdmisionPeriodeRepository repository
        ) =>
        repository.GetAdmisionPeriode(input.Id);
    }
}
    