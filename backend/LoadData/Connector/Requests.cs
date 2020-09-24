using GraphQL;
using RecAPI.AdmisionPeriodes.InputType;
using RecAPI.Organizations.InputType;
using RecAPI.Positions.InputType;
using RecAPI.Sections.InputType;
using RecAPI.Teams.InputType;
using System;
using System.Collections.Generic;
using System.Text;

namespace LoadData.Connector
{
    class Requests
    {

        public static GraphQLRequest LoginRequest(string email, string password)
        {
            var request = new GraphQLRequest
            {
                Query = @"
                    mutation login($email: String, $password: String) {
                        login(email: $email, password: $password)
                    }
                ",
                OperationName = "login",
                Variables = new {
                    email = email,
                    password = password
                },

            };
            return request;
        }

        public static GraphQLRequest GetOrganizationsRequest()
        {
            var request = new GraphQLRequest
            {
                Query = @"
                    query organizations {
                      organizations {
                        id,
                        name
                      }
                    }
                ",
                OperationName = "organizations"
            };
            return request;
        }

        public static GraphQLRequest CreateOrganizationRequest(CreateOrganizationInput input)
        {
            var request = new GraphQLRequest
            {
                Query = @"
                    mutation createOrganization($input: CreateOrganizationInput) {
                      createOrganization(input: $input) {
                        id
                      }
                    }
                ",
                OperationName = "createOrganization",
                Variables = new
                {
                    input = input
                },

            };
            return request;
        }

        public static GraphQLRequest GetAdmisionPeriodes()
        {
            var request = new GraphQLRequest
            {
                Query = @"
                    query admisionPeriodes {
                      admisionPeriodes {
                        id,
                        startDate,
                        endDate,
                        organization {
                          id
                        }
                      }
                    }
                ",
                OperationName = "admisionPeriodes",

            };
            return request;
        }

        public static GraphQLRequest CreateAdmisionPeriodes(CreateAdmisionPeriodeInput input)
        {
            var request = new GraphQLRequest
            {
                Query = @"
                    mutation createAdmisionPeriode($input: CreateAdmisionPeriodeInput) {
                      createAdmisionPeriode(input: $input) {
                        id
                      }
                    }
                ",
                OperationName = "createAdmisionPeriode",
                Variables = new
                {
                    input = input
                },
            };
            return request;
        }

        // Sections
        public static GraphQLRequest GetSections()
        {
            var request = new GraphQLRequest
            {
                Query = @"
                    query sections{
                      sections {
                        id,
                        name,
                        organization {
                          id,
                          name
                        }
                      }
                    }
                ",
                OperationName = "sections"
            };
            return request;
        }
        public static GraphQLRequest CreateSection(CreateSectionInput input)
        {
            var request = new GraphQLRequest
            {
                Query = @"
                    mutation createSection($input: CreateSectionInput) {
                      createSection(input: $input) {
                        id,
                        name
                      }
                    }
                ",
                OperationName = "createSection",
                Variables = new
                {
                    input = input
                },
            };
            return request;
        }

        // Teams
        public static GraphQLRequest GetTeams()
        {
            var request = new GraphQLRequest
            {
                Query = @"
                    query teams{
                      teams {
                        id,
                        name,
                        section {
                          id,
                          name
                        }
                      }
                    }
                ",
                OperationName = "teams"
            };
            return request;
        }
        public static GraphQLRequest CreateTeam(CreateTeamInput input)
        {
            var request = new GraphQLRequest
            {
                Query = @"
                    mutation createTeam($input: CreateTeamInput) {
                      createTeam(input: $input) {
                        id,
                        name
                      }
                    }
                ",
                OperationName = "createTeam",
                Variables = new
                {
                    input = input
                },
            };
            return request;
        }



        // Position
        public static GraphQLRequest GetPositions()
        {
            var request = new GraphQLRequest
            {
                Query = @"
                    query positions {
                      positions {
                        nodes {
                          id,
                          name,
                          section {
                            id,
                            name
                          },
                          team {
                            id,
                            name
                          }
                        }
                      }
                    }
                ",
                OperationName = "positions"
            };
            return request;
        }
        public static GraphQLRequest CreatePosition(CreatePositionInput input)
        {
            var request = new GraphQLRequest
            {
                Query = @"
                    mutation createPosition($input: CreatePositionInput) {
                      createPosition(input: $input) {
                        id,
                        name
                      }
                    }
                ",
                OperationName = "createPosition",
                Variables = new
                {
                    input = input
                },
            };
            return request;
        }
    }
}
