using System.Reflection;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using RecAPI.Teams.Models;
using RecAPI.Organizations.Models;
using RecAPI.Organizations.Repositories;
using RecAPI.Positions.Models;
using RecAPI.Sections.Repositories;
using RecAPI.Teams.Repositories;
using RecAPI.AdmisionPeriodes.Repositories;

namespace RecAPI.Resolvers
{
    // Resolves section field in Organization
    public sealed class SectionResolverOrganization : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var organization = ctx.Parent<Organization>();
                var repository = ctx.Service<ISectionRepository>();
                return repository.GetSectionsByOrganization(organization.Id);
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