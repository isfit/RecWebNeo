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
    // Resolves section field in Organization
    public sealed class OrganizationResolverAdmisionPeriode : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var admisionPeriode = ctx.Parent<AdmisionPeriode>();
                var repository = ctx.Service<IOrganizationRepository>();
                return repository.GetOrganization(admisionPeriode.Organization);
            });
        }
    }
    // Resolves AdmisionPeriodes field in Organization
    public sealed class PositionResolverAdmisionPeriode : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var admisionPeriode = ctx.Parent<AdmisionPeriode>();
                var repository = ctx.Service<IPositionRepository>();
                return repository.GetPositionsByAdmisionPeriode(admisionPeriode.Id);
            });
        }
    }

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
}