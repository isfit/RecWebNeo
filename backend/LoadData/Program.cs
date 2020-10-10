using System;
using System.Collections.Generic;
using System.IO;
using LoadData.Config;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Binder;
using Microsoft.Extensions.Configuration.FileExtensions;
using Microsoft.Extensions.Configuration.Json;
using LoadData.Connector;
using RecAPI.Organizations.Models;
using System.Linq;
using RecAPI.Organizations.InputType;
using RecAPI.AdmisionPeriodes.InputType;
using LoadData.Connector.Models;
using RecAPI.Sections.InputType;
using RecAPI.Teams.InputType;

namespace LoadData
{
    // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/options?view=aspnetcore-3.1

    class Program
    {

        static void Main(string[] args)
        {
            List<Position> readPositions = new List<Position>();
            
            Parser parser = new Parser();

            // Get config from appsettings file
            var path = Directory.GetCurrentDirectory();
            var builder = new ConfigurationBuilder()
                .SetBasePath(path)
                .AddJsonFile("appsettings.json")
                .Build();

            var dataConfig = builder.GetSection("data").Get<DataConfig>();
            var admisionConfig = builder.GetSection("admission").Get<AdmissionConfig>();

            // Possition 
            List<string> fileNames = ReadData.GetFileNames(
                    dataConfig.Directory,
                    dataConfig.TextExtention
                );

            foreach(var fileName in fileNames)
            {
                var rawContent = ReadData.GetDataFromFile(path + "/" + dataConfig.Directory + fileName);
                readPositions.AddRange(parser.ResolvePossitions(rawContent));
            }

            APIConnector apiConnector = new APIConnector(admisionConfig.ConnectionProperties.BaseUrl);

            // LOGIN
            bool authKey = apiConnector.Login(admisionConfig.ConnectionProperties.Email, admisionConfig.ConnectionProperties.Password).Result;
            if (!authKey)
            {
                ErrorMessage();
                return;
            }

            // ORGANIZATION
            List<Organization> organizations = apiConnector.GetOrganizations().Result;
            if (organizations == null)
            {
                ErrorMessage();
                return;
            }
            var existingOrganization = organizations.Where(x => x.Name == admisionConfig.OrganizationProperties.OrganizationName).FirstOrDefault();
            if (existingOrganization == null)
            {
                // Create organization
                CreateOrganizationInput organizationInput = new CreateOrganizationInput()
                {
                    Name = admisionConfig.OrganizationProperties.OrganizationName,
                    Description = admisionConfig.OrganizationProperties.OrganizationDescription
                };
                existingOrganization = apiConnector.CreateOrganization(organizationInput).Result;
            }

            // ADMISIONPERIODE
            List<AdmisionPeriode> admisionPeriodes = apiConnector.GetAdmisionPeriodes().Result;
            if (admisionPeriodes == null)
            {
                ErrorMessage();
                return;
            }
            var existingAdmisionPeriode = admisionPeriodes.Where(x => x.Organization.Id.Equals(existingOrganization.Id) && x.StartDate.Equals(DateTimeOffset.Parse(admisionConfig.AdmisionPeriodeProperties.AdmisionPeriodeStartDate).UtcDateTime) && x.EndDate.Equals(DateTimeOffset.Parse(admisionConfig.AdmisionPeriodeProperties.AdmisionPeriodeEndDate).UtcDateTime)).FirstOrDefault();
            if (existingAdmisionPeriode == null)
            {
                CreateAdmisionPeriodeInput admisionPeriodeInput = new CreateAdmisionPeriodeInput()
                {
                    Organization = existingOrganization.Id,
                    StartDate = DateTimeOffset.Parse(admisionConfig.AdmisionPeriodeProperties.AdmisionPeriodeStartDate).UtcDateTime,
                    EndDate = DateTimeOffset.Parse(admisionConfig.AdmisionPeriodeProperties.AdmisionPeriodeEndDate).UtcDateTime,
                    StartInterviewDate = DateTimeOffset.Parse(admisionConfig.AdmisionPeriodeProperties.AdmisionPeriodeInterviewStart).UtcDateTime,
                    EndInterviewDate = DateTimeOffset.Parse(admisionConfig.AdmisionPeriodeProperties.AdmisionPeriodeInterviewEnd).UtcDateTime,
                    MinAppliedPositions = admisionConfig.AdmisionPeriodeProperties.MinAppliedPositions,
                    MaxAppliedPositions = admisionConfig.AdmisionPeriodeProperties.MaxAppliedPositions
                };
                existingAdmisionPeriode = apiConnector.CreateAdmisionPeriode(admisionPeriodeInput).Result;
            }

            // SECTION
            List<Section> sections = apiConnector.GetSections().Result;
            if (sections == null)
            {
                ErrorMessage();
                return;
            }
            // TEAM
            List<Team> teams = apiConnector.GetTeams().Result;
            if (teams == null)
            {
                ErrorMessage();
                return;
            }
            // POSITIONS
            List<Position> positions = apiConnector.GetPositions().Result;
            if (positions == null)
            {
                ErrorMessage();
                return;
            }

            //  ----------------------------------
            readPositions.ForEach(position =>
            {
                // Check if section exists, or create
                Section section = sections.Where(x => x.Name.Equals(position.Section.Name)).FirstOrDefault();
                if (section == null)
                {
                    // Create section, and add to sections list
                    CreateSectionInput sectionInput = new CreateSectionInput()
                    {
                        Name = position.Section.Name,
                        Description = " ",
                        Organization = existingOrganization.Id
                    };
                    var newSection = apiConnector.CreateSection(sectionInput).Result;
                    sections.Add(newSection);
                    section = newSection;
                }
                Team team = teams.Where(x => x.Name.Equals(position.Team.Name)).FirstOrDefault();
                if (team == null)
                {
                    // Create team, and add to teams list
                    CreateTeamInput teamInput = new CreateTeamInput()
                    {
                        Name = position.Team.Name,
                        Description = " ",
                        Section = section.Id
                    };
                    var newTeam = apiConnector.CreateTeam(teamInput).Result;
                    teams.Add(newTeam);
                    team = newTeam;
                }
                Position selectedPosition = positions.Where(x => x.Name.Equals(position.Name)).FirstOrDefault();
                if (selectedPosition == null)
                {
                    // Create team, and add to teams list
                    CreatePositionInput positionInput = new CreatePositionInput()
                    {
                        Name = position.Name,
                        Description = position.Description,
                        Section = section.Id,
                        Team = team.Id,
                        AdmisionPeriode = existingAdmisionPeriode.Id,
                        Contact = position.Contact
                    };
                    var newPosition = apiConnector.CreatePosition(positionInput).Result;
                    if (newPosition != null)
                    {
                        positions.Add(newPosition);
                    }
                }
            });
        }

        public static void ErrorMessage()
        {
            Console.WriteLine("An error occured! Server error?");
        }
    }

}
