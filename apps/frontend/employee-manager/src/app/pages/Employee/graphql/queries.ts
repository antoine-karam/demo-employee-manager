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
    positions {
      Title
    }
  }
`;

export const GET_EMPLOYEE_ADDRESS = gql`
  query GetEmployeeAddress($id: String!) {
    address(id: $id) {
      City
      State
      Country
      Street
    }
  }
`;
