import { gql } from '@apollo/client';

const POSITIONS = gql`
    query positions {
        positions {
        nodes {
            id,
            __typename,
            name,
            description,
            team {
                id
                name
            },
            section {
                id
                name
            },
            prefferedInterviewers {
              id
              __typename
              firstName
              lastName
              email
            },
            admisionPeriode {
                id
            }
        }
    }
    }
`;


const FILTER_POSITIONS = gql`
    query positions($input: PositionFilter) {
      positions(where: $input) {
          totalCount,
        nodes {
          id,
          name,
          description,
          section {
            id,
            name
          },
          team {
            id,
            name
          },
          admisionPeriode {
            id
          }
        }
      }
    }
`;

const ADD_PREFERRED_INTERVIEWERS = gql`
mutation addPreferedInterviewers($interviewers: [String!]!, $positionId: String!) {
  addPreferedInterviewers(interviewers: $interviewers, positionId: $positionId){
    id
    __typename
    prefferedInterviewers{
      id
      __typename
    }
  }
}
`;

const REMOVE_PREFERRED_INTERVIEWERS = gql`
mutation removePreferedInterviewers($interviewers: [String!]!, $positionId: String!) {
  removePreferedInterviewers(interviewers: $interviewers, positionId: $positionId){
    id
    __typename
    prefferedInterviewers{
      id
      __typename
    }
  }
}
`;




export {
    POSITIONS,
    FILTER_POSITIONS,
    ADD_PREFERRED_INTERVIEWERS,
    REMOVE_PREFERRED_INTERVIEWERS
};