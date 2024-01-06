import { gql } from '@apollo/client';

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($Id: String!) {
    removeEmployee(id: $Id)
  }
`;
