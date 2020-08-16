import { gql } from '@apollo/client';

const POSITIONS = gql`
    query positions {
        positions {
        nodes {
            id,
            name,
            team {
                name
            }
        }
    }
    }
`;

export {
    POSITIONS
};