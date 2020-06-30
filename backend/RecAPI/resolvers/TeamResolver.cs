using System.Linq;
using System.Reflection;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using RecAPI.Models;
using RecAPI.Repositories;

namespace RecAPI.Resolvers
{
    public sealed class GetTeamResolverAtribute : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                Position position = ctx.Parent<Position>();
                ITeamRepository repository = ctx.Service<ITeamRepository>();
                return repository.GetTeam(position.Team);
            });
        }
    }
}