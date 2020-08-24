using HotChocolate;
using RecAPI.Generic.InputType;
using RecAPI.Interviews.Models;
using RecAPI.Interviews.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecAPI.Interviews.Mutations
{
    public class InterviewMutations
    {
        // Create interview
        public Interview CreateInterview(
            SingleModelInput input
            )
        {
            return null;
        }

        // Update interview
        public Interview UpdateInterview(
            [Service] IInterviewRepository interviewRepository
            )
        {
            return null;
        }

        // Add interviewer
        
        // Remove interviewer

        // Accept and Reject Interview

        // Delte interview

        // Hente ut fra application hvilke seksjoner / teams det tilhører
    }
}
