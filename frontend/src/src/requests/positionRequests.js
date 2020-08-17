import { gql } from '@apollo/client';

const POSITIONS = gql`
    query positions {
        positions {
        nodes {
            id,
            name,
            description,
            team {
                name
            },
            section {
                name
            }
            
        }
    }
    }
`;

export {
    POSITIONS
};