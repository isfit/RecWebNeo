using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using GraphQL.Client.Http;
using Newtonsoft.Json;
using GraphQL.Client.Serializer.Newtonsoft;
using GraphQL;
using GraphQL.Client.Abstractions;
using RecAPI.Organizations.Models;
using RecAPI.Organizations.InputType;
using RecAPI.AdmisionPeriodes.InputType;
using LoadData.Connector.Models;
using RecAPI.Sections.InputType;
using RecAPI.Teams.InputType;

namespace LoadData.Connector
{
    class APIConnector
    {

        private GraphQLHttpClient client;
        private String apiKey;

        public APIConnector(string baseUri)
        {
            client = new GraphQLHttpClient(baseUri, new NewtonsoftJsonSerializer());
            apiKey = "";
        }

        private void updateAuthHeader(string token)
        {
            client.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {token}");
        }


        public async Task<bool> Login(string email, string password) {
            GraphQLRequest request = Requests.LoginRequest(email, password);
            var graphQLResponse = await client.SendMutationAsync<dynamic>(request);

            if (graphQLResponse?.Data?.login != null)
            {
                apiKey = graphQLResponse.Data.login;
                updateAuthHeader(apiKey);
                return true;
            }
            return false;
        }


        // Organization
        public async Task<List<Organization>> GetOrganizations()
        {
            GraphQLRequest request = Requests.GetOrganizationsRequest();
            var graphQLResponse = await client.SendQueryAsync(request, () => new { Organizations = new List<Organization>() });

            if (graphQLResponse?.Data?.Organizations != null)
            {
                return graphQLResponse.Data.Organizations;
            }
            return null;
        }

        public async Task<Organization> CreateOrganization(CreateOrganizationInput input)
        {
            GraphQLRequest request = Requests.CreateOrganizationRequest(input);
            var graphQLResponse = await client.SendMutationAsync(request, () => new { createOrganization = new Organization() });

            if (graphQLResponse?.Data?.createOrganization != null)
            {
                return graphQLResponse.Data.createOrganization;
            }
            return null;
        }


        // Admision Periode
        public async Task<List<AdmisionPeriode>> GetAdmisionPeriodes()
        {
            GraphQLRequest request = Requests.GetAdmisionPeriodes();
            var graphQLResponse = await client.SendQueryAsync(request, () => new { admisionPeriodes = new List<AdmisionPeriode>() });

            if (graphQLResponse?.Data?.admisionPeriodes != null)
            {
                return graphQLResponse.Data.admisionPeriodes;
            }
            return null;
        }
        public async Task<AdmisionPeriode> CreateAdmisionPeriode(CreateAdmisionPeriodeInput input)
        {
            GraphQLRequest request = Requests.CreateAdmisionPeriodes(input);
            var graphQLResponse = await client.SendMutationAsync(request, () => new { createAdmisionPeriode = new AdmisionPeriode() });

            if (graphQLResponse?.Data?.createAdmisionPeriode != null)
            {
                return graphQLResponse.Data.createAdmisionPeriode;
            }
            return null;
        }

        // Section
        public async Task<List<Section>> GetSections()
        {
            GraphQLRequest request = Requests.GetSections();
            var graphQLResponse = await client.SendQueryAsync(request, () => new { sections = new List<Section>() });

            if (graphQLResponse?.Data?.sections != null)
            {
                return graphQLResponse.Data.sections;
            }
            return null;
        }
        public async Task<Section> CreateSection(CreateSectionInput input)
        {
            GraphQLRequest request = Requests.CreateSection(input);
            var graphQLResponse = await client.SendMutationAsync(request, () => new { createSection = new Section() });

            if (graphQLResponse?.Data?.createSection != null)
            {
                return graphQLResponse.Data.createSection;
            }
            return null;
        }

        // Teams
        public async Task<List<Team>> GetTeams()
        {
            GraphQLRequest request = Requests.GetTeams();
            var graphQLResponse = await client.SendQueryAsync(request, () => new { teams = new List<Team>() });

            if (graphQLResponse?.Data?.teams != null)
            {
                return graphQLResponse.Data.teams;
            }
            return null;
        }
        public async Task<Team> CreateTeam(CreateTeamInput input)
        {
            GraphQLRequest request = Requests.CreateTeam(input);
            var graphQLResponse = await client.SendMutationAsync(request, () => new { createTeam = new Team() });

            if (graphQLResponse?.Data?.createTeam != null)
            {
                return graphQLResponse.Data.createTeam;
            }
            return null;
        }


        // Position
        public async Task<List<Position>> GetPositions()
        {
            GraphQLRequest request = Requests.GetPositions();
            var graphQLResponse = await client.SendQueryAsync(request, () => new { positions = new { nodes = new List<Position>() } });

            if (graphQLResponse?.Data?.positions?.nodes != null)
            {
                return graphQLResponse.Data.positions.nodes;
            }
            return null;
        }
        public async Task<Position> CreatePosition(CreatePositionInput input)
        {
            GraphQLRequest request = Requests.CreatePosition(input);
            var graphQLResponse = await client.SendMutationAsync(request, () => new { createPosition = new Position() });

            if (graphQLResponse?.Data?.createPosition != null)
            {
                return graphQLResponse.Data.createPosition;
            }
            return null;
        }
    }
}
