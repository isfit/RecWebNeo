using System.Collections.Generic;
using RecAPI.AdmisionPeriodes.Models;
namespace RecAPI.AdmisionPeriodes.Repositories
{
    public interface IAdmisionPeriodeRepository
    {
        IEnumerable<AdmisionPeriode> GetAdmisionPeriodes();
        IEnumerable<AdmisionPeriode> GetAdmisionPeriodes(List<string> ids);
        IEnumerable<AdmisionPeriode> GetAdmisionPeriodesByOrganization(string organizationId);
        AdmisionPeriode GetAdmisionPeriode(string id);
        AdmisionPeriode CreateAdmisionPeriode(AdmisionPeriode admisionPeriode);
        AdmisionPeriode UpdateAdmisionPeriode(string id, AdmisionPeriode admisionPeriode);
        bool DeleteAdmisionPeriode(string id);
    }
}