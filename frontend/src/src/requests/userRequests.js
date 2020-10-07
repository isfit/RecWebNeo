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
      id
      email
      firstName
      lastName
      phoneNumber
    }
  }
`;

const ME_BUSY_TIMES = gql`
  query me {
    me {
      busyTime
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
        id
        __typename
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

const GET_ISFIT_USERS = gql`
  query users {
    users (where:{email_contains:"@isfit.no"}) {
      nodes {
        id
        firstName
        lastName
        email
        busyTime
        interviewsCount
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
    setUserRole(email: $email, role: $role){
      id
      roles
    }
  }
`;

const SET_SECTION_AND_TEAM = gql`
  mutation setSectionAndTeamToUser($email: String!, $sections: [String!]!, $teams: [String!]!) {
    setSectionAndTeamToUser(email: $email, sections: $sections, teams: $teams){
      id
      sections {
        id
        name
      }
      teams {
        id
        name
      }
    }
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

const EDIT_USER_INFORMATION = gql`
  mutation EditUserInformation($input: UpdateUserInput!) {
    editUserInformation(input: $input) {
      id
      firstName
      lastName
      phoneNumber
    }
  }
  `;

const SET_USER_APPROVED = gql`
  mutation SetUserApproved($approved: Boolean!, $email: String!) {
    setUserApproved(approved: $approved, email: $email)
  }
`;



export { LOGIN, ME, ME_NAME, REGISTER, APPLY, MYAPPLICATION, GET_ALL_USERS, GET_SECTIONS, SET_USER_ROLE, SET_SECTION_AND_TEAM, UPDATE_MY_PASSWORD, UPDATE_USER_PASSWORD, EDIT_USER_INFORMATION, ME_BUSY_TIMES, GET_ISFIT_USERS, SET_USER_APPROVED };
