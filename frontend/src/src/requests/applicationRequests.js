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
                    lastName,
                    phoneNumber
                },
                positions {
                    key,
                    value {
                        id,
                        name,
                        section {
                            name
                        }
                        team {
                            name
                        }
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