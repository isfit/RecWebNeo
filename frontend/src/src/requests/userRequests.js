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
      available
      prioritized
      interest
    }
  }
`;


const GET_ISFIT_USERS = gql`
  query users {
    users {
      nodes {
        firstName
        lastName
        email
      }
    }
  }
`;


const GET_SECTIONS = gql`
  query sections{
    sections {
      name
      id
      teams {
        name
        id
      }
    }
  }
`;

const SET_ROLE = gql`
  mutation setRole($email: String!, $role: String!) {
    setRole(email: $email, role: $role)
  }
`;

const ADD_SECTION_TO_USER = gql`
  mutation addSections($email: String!, $sections: [String]!) {
    addSections(email: $email, sections: $sections)
  }
`;

const ADD_TEAM_TO_USER = gql`
  mutation addTeams($email: String!, $teams: [String]!) {
    addTeams(email: $email, teams: $teams)
  }
`;


export { LOGIN, ME, ME_NAME, REGISTER, APPLY, MYAPPLICATION, GET_ISFIT_USERS, GET_SECTIONS, SET_ROLE, ADD_SECTION_TO_USER, ADD_TEAM_TO_USER };
