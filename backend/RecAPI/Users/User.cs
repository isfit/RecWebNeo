using System;
using System.Collections.Generic;
using System.ComponentModel;
using HotChocolate.AspNetCore.Authorization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using RecAPI.Resolvers;
using RecAPI.Sections.Models;
using RecAPI.Teams.Models;

namespace RecAPI.Users.Models
{
    public class User : ISectionsConnection, ITeamsConnection
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; set; }

        [BsonRequired]
        public string AuthId { get; set; }

        [BsonRequired]
        public string Email { get; set; }

        [BsonRequired]
        public List<string> Groups { get; set; }

        [BsonRequired]
        public string FirstName { get; set; }

        [BsonRequired]
        public string LastName { get; set; }

        [BsonRequired]
        public DateTime BirtDate { get; set; }

        // Interview data
        [Authorize(Policy = "internal")]
        [TeamsResolver]
        public List<string> Teams { get; set; }

        [Authorize(Policy = "internal")]
        [SectionsResolver]
        public List<string> Sections { get; set; }

        [Authorize(Policy = "internal")]
        public List<string> BusyTime { get; set; }


        [Authorize(Policy = "administrator")]
        public bool AddSection(string sectionId)
        {
            if (Sections == null)
            {
                Sections = new List<string>();
            }
            if (!Sections.Contains(sectionId))
            {
                Sections.Add(sectionId);
                return true;
            }
            return false;
        }
        [Authorize(Policy = "administrator")]
        public bool AddTeam(string teamId)
        {
            if (Teams == null)
            {
                Teams = new List<string>();
            }
            if (!Teams.Contains(teamId))
            {
                Teams.Add(teamId);
                return true;
            }
            return false;
        }
        [Authorize(Policy = "administrator")]
        public bool RemoveSection(string sectionId)
        {
            if (Sections == null)
            {
                Sections = new List<string>();
            }
            if (Sections.Contains(sectionId))
            {
                Sections.Remove(sectionId);
                return true;
            }
            return false;
        }
        [Authorize(Policy = "administrator")]
        public bool RemoveTeam(string teamId)
        {
            if (Teams == null)
            {
                Teams = new List<string>();
            }
            if (Teams.Contains(teamId))
            {
                Teams.Remove(teamId);
                return true;
            }
            return false;
        }
    }
}