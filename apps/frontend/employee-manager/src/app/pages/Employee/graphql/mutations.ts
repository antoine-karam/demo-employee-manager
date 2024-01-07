import { gql } from '@apollo/client';

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($Id: String!) {
    removeEmployee(id: $Id)
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation updatedEmployee($employee: EmployeeInput!) {
    updateEmployee(employee: $employee) {
      Id
      FirstName
      LastName
      Position
      Gender
      Email
      PictureUrl
      DateOfBirth
      Phone
      PrimaryAddress
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation addEmployee($employee: EmployeeInput!) {
    addEmployee(employee: $employee) {
      Id
      FirstName
      LastName
      Position
      Gender
      Email
      PictureUrl
      DateOfBirth
      Phone
      PrimaryAddress
    }
  }
`;