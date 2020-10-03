using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using RecAPI.Interviews.Models;
using RecAPI.Interviews.Repositories;
using RecAPI.Users.Models;
using RecAPI.Users.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace RecAPI.Resolvers
{
    public class InterviewResolver
    {
        public sealed class InterviewCountResolver : ObjectFieldDescriptorAttribute
        {
            public override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
            {
                descriptor.Resolver(ctx =>
                {
                    var parrent = ctx.Parent<User>();
                    var repository = ctx.Service<IInterviewRepository>();
                    var userRepository = ctx.Service<IUserRepository>();
                    var interviews = repository.GetUserConnectedInterviews(parrent.Id);
                    var filteredInterviews = interviews.Where(interview =>
                    {
                        var applicant = userRepository.GetUser(interview.Applicant.User);
                        return (applicant?.Approved ?? false) == true;
                    }).ToList() ?? new List<Interview>();
                    return filteredInterviews.Count();
                });
            }
        }
    }
}
