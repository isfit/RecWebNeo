import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const ME_NAME = gql`
  query me {
    me {
      firstName
      lastName
    }
  }
`;

const ME = gql`
  query me {
    me {
      email
      firstName
      lastName
    }
  }
`;

const REGISTER = gql`
  mutation registerUser($input: RegisterUserInput) {
    registerUser(registerUser: $input)
  }
`;

const APPLY = gql`
  mutation createApplication($input: CreateApplicationInput) {
    createApplication(input: $input) {
      id
    }
  }
`;

const MYAPPLICATION = gql`
  query myApplication {
    myApplication {
      id
      applicationText
      positions {
        key
        value {
          id
          name
        }
      }
      prioritized
      interest
    }
  }
`;

export { LOGIN, ME, ME_NAME, REGISTER, APPLY, MYAPPLICATION };
