using System.Collections.Generic;
using System.Reflection;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using RecAPI.Models;
using RecAPI.Repositories;

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
}