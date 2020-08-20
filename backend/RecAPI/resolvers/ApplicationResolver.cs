using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using MongoDB.Driver.Core.Operations;
using RecAPI.Applications.Models;
using RecAPI.Positions.Models;
using RecAPI.Positions.Repositories;
using RecAPI.Users.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace RecAPI.Resolvers
{
    public sealed class ApplicationApplicantResolver : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var application = ctx.Parent<Application>();
                var repository = ctx.Service<IUserRepository>();
                return repository.GetUserByAuth(application.Applicant);
            });
        }
    }

    public sealed class PositionsApplicationResolver : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var application = ctx.Parent<Application>();
                var repository = ctx.Service<IPositionRepository>();
                var positions = application.Positions;
                var positionsResolved = new Dictionary<string, Position>();
                foreach(KeyValuePair<string, string> priority in positions)
                {
                    positionsResolved.Add(priority.Key, repository.GetPosition(priority.Value)); 
                }
                return positionsResolved;
            });
        }
    }
}
