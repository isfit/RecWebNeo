import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const REGISTER = gql`
  mutation registerUser($input: RegisterUserInput) {
    registerUser(registerUser: $input)
  }
`;

export {
    LOGIN, REGISTER,
};