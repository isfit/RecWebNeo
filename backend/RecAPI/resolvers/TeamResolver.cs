using System.Linq;
using System.Reflection;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using RecAPI.Positions.Models;
using RecAPI.Sections.Models;
using RecAPI.Teams.Repositories;
using RecAPI.Teams.Models;
using RecAPI.Sections.Repositories;
using RecAPI.Positions.Repositories;

namespace RecAPI.Resolvers
{
    public sealed class TeamResolver : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var parent = ctx.Parent<ITeamConnection>();
                var repository = ctx.Service<ITeamRepository>();
                return repository.GetTeam(parent.Team);
            });
        }
    }

    public sealed class TeamsResolver : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var parent = ctx.Parent<ITeamsConnection>();
                var repository = ctx.Service<ITeamRepository>();
                return repository.GetTeams(parent.Teams);
            });
        }
    }

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
}