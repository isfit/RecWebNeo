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

namespace RecAPI.Resolvers
{
    // Resolves Teams field in Section
    public sealed class TeamResolverSection : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var section = ctx.Parent<Section>();
                var repository = ctx.Service<ITeamRepository>();
                return repository.GetTeams(section.Id);
            });
        }
    }
    // Resolves Position field in Section
    public sealed class PositionResolverSection : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var section = ctx.Parent<Section>();
                var repository = ctx.Service<IPositionRepository>();
                return repository.GetSectionPositions(section.Id);
            });
        }
    }
    // Resolves Organization field in Section
    public sealed class OrganizationResolverSection : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var section = ctx.Parent<Section>();
                var repository = ctx.Service<IOrganizationRepository>();
                return repository.GetOrganization(section.Organization);
            });
        }
    }

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
}