using System.Reflection;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using RecAPI.Teams.Models;
using RecAPI.Organizations.Models;
using RecAPI.Organizations.Repositories;
using RecAPI.AdmisionPeriodes.Models;
using RecAPI.Positions.Repositories;
using RecAPI.AdmisionPeriodes.Repositories;

namespace RecAPI.Resolvers
{
    public sealed class AdmisionPeriodeResolver : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var parrent = ctx.Parent<IAdmisionPeriodeConnection>();
                var repository = ctx.Service<IAdmisionPeriodeRepository>();
                return repository.GetAdmisionPeriode(parrent.AdmisionPeriode);
            });
        }
    }

    // Resolves AdmisionPeriodes field in Organization
    public sealed class AdmisionPeriodeResolverOrganization : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var organization = ctx.Parent<Organization>();
                var repository = ctx.Service<IAdmisionPeriodeRepository>();
                return repository.GetAdmisionPeriodesByOrganization(organization.Id);
            });
        }
    }
}