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

namespace RecAPI.Resolvers
{
    // Reolves Team field in Position
    public sealed class TeamResolverPosition : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var position = ctx.Parent<Position>();
                var repository = ctx.Service<ITeamRepository>();
                return repository.GetTeam(position.Team);
            });
        }
    }
    public sealed class AdmisionPeriodeResolverPosition : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var position = ctx.Parent<Position>();
                var repository = ctx.Service<IAdmisionPeriodeRepository>();
                return repository.GetAdmisionPeriode(position.AdmisionPeriode);
            });
        }
    }
}