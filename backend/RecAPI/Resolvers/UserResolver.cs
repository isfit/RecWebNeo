using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using RecAPI.Applications.Models;
using RecAPI.Users.Repositories;
using System.Reflection;

namespace RecAPI.Resolvers
{
    public sealed class ApplicantResolver : ObjectFieldDescriptorAttribute
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
}
