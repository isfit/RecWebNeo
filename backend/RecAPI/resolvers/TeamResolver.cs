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
    // Resolves Positions field in Team
    public sealed class PositionResolverTeam : ObjectFieldDescriptorAttribute
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