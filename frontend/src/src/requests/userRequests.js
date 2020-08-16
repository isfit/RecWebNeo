import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const ME_NAME = gql`
    query me {
      me {
        firstName,
        lastName,  
      }
    }
`;

const ME = gql`
    query me {
      me {
        email,
        firstName,
        lastName,
        birtDate
      }
    }
`;

const REGISTER = gql`
  mutation registerUser($input: RegisterUserInput) {
    registerUser(registerUser: $input)
  }
`;

export {
    LOGIN,
    ME,
    ME_NAME,
    REGISTER
};