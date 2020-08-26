using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using RecAPI.Applications.Models;
using RecAPI.Auth.Repositories;
using RecAPI.Users.Models;
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

    public sealed class UserResolver : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var userConnection = ctx.Parent<IUserConnection>();
                var repository = ctx.Service<IUserRepository>();
                return repository.GetUser(userConnection.User);
            });
        }
    }

    public sealed class UserRolesResolver : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
        {
            descriptor.Resolver(ctx =>
            {
                var user = ctx.Parent<User>();
                var repository = ctx.Service<IAuthRepository>();
                var authUser = repository.GetAuthUser(user.AuthId);
                return authUser != null ? authUser.Roles : null;
            });
        }
    }
}
