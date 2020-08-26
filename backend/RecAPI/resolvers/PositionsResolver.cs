using System.Reflection;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using RecAPI.Teams.Models;
using RecAPI.Sections.Models;
using RecAPI.Positions.Repositories;
using RecAPI.Positions.Models;
using RecAPI.Sections.Repositories;
using RecAPI.Teams.Repositories;
using RecAPI.AdmisionPeriodes.Repositories;
using RecAPI.AdmisionPeriodes.Models;

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
    
    // Resolves AdmisionPeriodes field in Organization
    public sealed class PositionResolverAdmisionPeriode : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var admisionPeriode = ctx.Parent<AdmisionPeriode>();
                var repository = ctx.Service<IPositionRepository>();
                return repository.GetPositionsByAdmisionPeriode(admisionPeriode.Id);
            });
        }
    }
}