import { gql } from "@apollo/client";


const GET_ADMISSION_PERIODS = gql`
  query admisionPeriodes {
    admisionPeriodes{
        id
        startDate
        endDate
        startInterviewDate
        endInterviewDate
    }
  }
`;




export { GET_ADMISSION_PERIODS };
