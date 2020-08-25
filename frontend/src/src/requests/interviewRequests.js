import { gql } from '@apollo/client';


const CREATE_INTERVIEW = gql`
  mutation CreateInterview($input: CreateInterviewInput){
    createInterview(input: $input) {
        id
    }

  }
`;

const GET_APPLICATIONS_WITHOUT_INTERVIEW = gql`
    query applicationWithoutInterview {
        applicationWithoutInterview {
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

const MY_INTERVIEWS = gql`
    query myInterviews {
        myInterviews {
            nodes {
                id
                start
                interviewers {
                    user {
                        firstName
                        lastName
                        email
                    }
                }
                application {
                    positions {
                        key
                        value {
                            name
                            section {
                                name
                            }
                            team {
                                name
                            }
                        }
                    }
                }
                applicant {
                    accepted
                    id
                    user {
                        firstName
                        lastName
                        email
                        phoneNumber
                    }
                }
            }
        }
    }
`;

const ALL_INTERVIEWS = gql`
    query interviews {
        interviews {
            nodes {
                id
                start
                interviewers {
                    user {
                        firstName
                        lastName
                        email
                    }
                }
                application {
                    id
                    positions {
                        key
                        value {
                            name
                            section {
                                name
                            }
                            team {
                                name
                            }
                        }
                    }
                }
                applicant {
                    accepted
                    id
                    user {
                        id
                        firstName
                        lastName
                        email
                        phoneNumber
                    }
                }
            }
        }
    }
`;

const APPLICATION_BUSY_HOURS = gql`
    mutation applicationBusyTimes($input: ApplicationBusyTimesInput) {
        applicationBusyTimes(input: $input)
      }

`;



export {CREATE_INTERVIEW, GET_APPLICATIONS_WITHOUT_INTERVIEW,MY_INTERVIEWS,ALL_INTERVIEWS,APPLICATION_BUSY_HOURS}