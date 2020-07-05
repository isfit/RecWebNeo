using System.Linq;
using System.Reflection;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using RecAPI.Positions.Models;
using RecAPI.Teams.Models;
using RecAPI.Sections.Repositories;

namespace RecAPI.Resolvers
{
    public sealed class GetPositionSectionResolverAtribute : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                Position position = ctx.Parent<Position>();
                ISectionRepository repository = ctx.Service<ISectionRepository>();
                return repository.GetSection(position.Section);
            });
        }
    }
    public sealed class GetTeamSectionResolverAtribute : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                Team team = ctx.Parent<Team>();
                ISectionRepository repository = ctx.Service<ISectionRepository>();
                return repository.GetSection(team.Section);
            });
        }
    }
}