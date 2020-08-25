using HotChocolate;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecAPI.Interviews.Input
{
    public class CreateInterviewInput
    {
        [GraphQLNonNullType]
        [BsonId]
        public string Application { get; set; }

        public List<string> InterviewerEmails { get; set; }

        [GraphQLNonNullType]
        public DateTime Start { get; set; }

        public string Location { get; set; }
    }

    public class UpdateInterviewInput
    {
        [GraphQLNonNullType]
        [BsonId]
        public string Id { get; set; }

        public List<string> InterviewerEmails { get; set; }

        public DateTime? Start { get; set; }

        public string Location { get; set; }
    }

    public class InterviewerAtInterviewInput
    {
        [GraphQLNonNullType]
        public string UserEmail { get; set; }

        [GraphQLNonNullType]
        [BsonId]
        public string Interview { get; set; }
    }

}
