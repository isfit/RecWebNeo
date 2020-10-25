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
                            id
                            name
                        }
                        team {
                            id
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

const GET_APPLICATION_COUNT = gql`
    query applications {
        applications {
            totalCount
        }
    }
`;



const NEW_APPLICATION_SUBSCRIPTION = gql`
    subscription onNewApplication {
        onNewApplication
    }
`;





export {
    APPLICATIONS,
    UPDATE_APPLICATION,
    GET_APPLICATION_COUNT,
    NEW_APPLICATION_SUBSCRIPTION
}