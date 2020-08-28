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

const UPDATE_APPLICATION = gql`
mutation updateApplication($input: UpdateApplicationInput) {
    updateApplication(input: $input) {
        id,
        applicationText,
        prioritized,
        interest
    }
}
`;

export {
    APPLICATIONS,
    UPDATE_APPLICATION
}