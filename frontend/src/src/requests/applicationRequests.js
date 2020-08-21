import { gql } from '@apollo/client';

const APPLICATIONS = gql`
    query applications {
        applications {
            nodes {
                id,
                applicationText,
                prioritized,
                interest,
                applicant {
                    id,
                    email,
                    firstName,
                    lastName
                },
                positions {
                    key,
                    value {
                        id,
                        name
                    }
                }              
            },
            totalCount
        }
    }
`;

export {
    APPLICATIONS
}