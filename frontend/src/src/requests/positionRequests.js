import { gql } from '@apollo/client';

const POSITIONS = gql`
    query positions {
        positions {
        nodes {
            id,
            name,
            admisionPeriode {
                endDate
            }
        }
    }
    }
`;

export {
    POSITIONS
};