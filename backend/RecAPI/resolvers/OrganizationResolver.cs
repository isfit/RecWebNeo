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
    public sealed class OrganizationResolver : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var parent = ctx.Parent<IOrganizationConnection>();
                var repository = ctx.Service<IOrganizationRepository>();
                return repository.GetOrganization(parent.Organization);
            });
        }
    }
}