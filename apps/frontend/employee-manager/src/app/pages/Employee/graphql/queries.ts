import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      Id
      Position
      Gender
      FirstName
      LastName
      Email
      PictureUrl
      DateOfBirth
      Phone
      PrimaryAddress
    }
  }
`;
