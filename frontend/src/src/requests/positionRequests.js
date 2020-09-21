import { gql } from '@apollo/client';

const POSITIONS = gql`
    query positions {
        positions {
        nodes {
            id,
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




export {
    POSITIONS,
    FILTER_POSITIONS
};