using System.Collections.Generic;
using System.Reflection;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using RecAPI.Teams.Models;
using RecAPI.Sections.Models;
using RecAPI.Positions.Repositories;

namespace RecAPI.Resolvers
{
    public sealed class GetTeamPositionsResolverAtribute : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                Team team = ctx.Parent<Team>();
                IPositionRepository repository = ctx.Service<IPositionRepository>();
                return repository.GetTeamPositions(team.Id);
            });
        }
    }
    public sealed class GetSectionPositionsResolverAtribute : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                Section section = ctx.Parent<Section>();
                IPositionRepository repository = ctx.Service<IPositionRepository>();
                return repository.GetTeamPositions(section.Id);
            });
        }
    }
}