using System.Linq;
using System.Reflection;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using RecAPI.Positions.Models;
using RecAPI.Teams.Models;
using RecAPI.Sections.Repositories;
using RecAPI.Sections.Models;
using RecAPI.Teams.Repositories;
using RecAPI.Positions.Repositories;
using RecAPI.Organizations.Repositories;
using RecAPI.Organizations.Models;

namespace RecAPI.Resolvers
{
    public sealed class SectionResolver : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var parent = ctx.Parent<ISectionConnection>();
                var repository = ctx.Service<ISectionRepository>();
                return repository.GetSection(parent.Section);
            });
        }
    }

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
}