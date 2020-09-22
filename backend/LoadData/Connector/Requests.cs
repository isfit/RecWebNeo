using GraphQL;
using System;
using System.Collections.Generic;
using System.Text;

namespace LoadData.Connector
{
    class Requests
    {

        public static GraphQLRequest LoginRequest(string email, string password)
        {
            var loginRequest = new GraphQLRequest
            {
                Query = @"
                {
                    mutation login($email: String, $password: String) {
                        login(email: $email, password: $password)
                    }
                }
                ",
                OperationName = "login",
                Variables = new
                {
                    email = "admin@isfit.com",
                    password = "123456"
                }
            };
            return loginRequest;
        };

    }
}
