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
        }
      }
    }
`;




export {
    POSITIONS,
    FILTER_POSITIONS
};