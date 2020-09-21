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
                status
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

const ALL_INTERVIEWS = gql`
    query interviews {
        interviews {
            nodes {
                id
                start
                status
                location
                interviewers {
                    user {
                        firstName
                        lastName
                        email
                    }
                }
                application {
                    id
                    applicationText
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

const ALL_INTERVIEWS_BY_DATE = gql`
    query interviews{
        interviews(order_by: {start: ASC}){
            nodes {
                id
                start
                status
                location
                interviewers {
                    user {
                        firstName
                        lastName
                        email
                    }
                }
                application {
                    id
                    applicationText
                    positions {
                        key
                        value {
                            id
                            name
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
                }
                applicant {
                    accepted
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

const DELETE_INTERVIEW = gql`
    mutation deleteInterview($input:SingleModelInput){
        deleteInterview(input: $input)
    }
`;

const SET_INTERVIEW_STATUS = gql`
  mutation setInterviewStatus($interviewId: String!, $interviewStatus: String!) {
    setInterviewStatus(interviewId: $interviewId, interviewStatus: $interviewStatus){
        id
        status
    }
  }
`;



export {CREATE_INTERVIEW, GET_APPLICATIONS_WITHOUT_INTERVIEW,MY_INTERVIEWS,ALL_INTERVIEWS,APPLICATION_BUSY_HOURS, DELETE_INTERVIEW, SET_INTERVIEW_STATUS, ALL_INTERVIEWS_BY_DATE}