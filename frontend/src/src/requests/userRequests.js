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
      phoneNumber
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


const GET_ALL_USERS = gql`
  query users {
    users {
      nodes {
        firstName
        lastName
        email
        roles
        sections {
          name
        }
        teams {
          name
        }
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

const SET_USER_ROLE = gql`
  mutation setUserRole($email: String!, $role: String!) {
    setUserRole(email: $email, role: $role)
  }
`;

const SET_SECTIONS_TO_USER = gql`
  mutation setSectionsToUser($email: String!, $sections: [String]!) {
    setSectionsToUser(email: $email, sections: $sections)
  }
`;

const SET_TEAMS_TO_USER = gql`
  mutation setTeamsToUser($email: String!, $teams: [String]!) {
    setTeamsToUser(email: $email, teams: $teams)
  }
`;

const UPDATE_MY_PASSWORD = gql`
  mutation UpdateMyPassword($input: UserUpdatePasswordInput) {
    updateMyPassword(passwordInput: $input)
  }
`;

const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPassword($email: String!, $password: String!) {
    updateUserPassword(email: $email, newPassword: $password)
  }
`;


export { LOGIN, ME, ME_NAME, REGISTER, APPLY, MYAPPLICATION, GET_ALL_USERS, GET_SECTIONS, SET_USER_ROLE, SET_SECTIONS_TO_USER, SET_TEAMS_TO_USER, UPDATE_MY_PASSWORD, UPDATE_USER_PASSWORD };
