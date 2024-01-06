import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { GET_EMPLOYEES } from './graphql/queries';

import { AlertNotification } from '../../helper/types';

import Alert from '../../components/Alert/Alert';
import LoaderScreen from '../../components/Loader/LoaderScreen';
import ContentScreen from '../../components/Content/ContentScreen';

import classes from './Employee.module.less';
import EmployeeTable from './components/EmployeeTable';
import { useNavigate } from 'react-router-dom';
import { DELETE_EMPLOYEE } from './graphql/mutations';

const EmployeePage: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<{ employees: [] }>(GET_EMPLOYEES);
  const [deleteEmployee] = useMutation<boolean>(DELETE_EMPLOYEE, {
    refetchQueries: ['GetEmployees'],
  });
  const [alert, setAlert] = useState<AlertNotification | null>(null);

  if (loading) return <LoaderScreen text="Loading" />;
  if (error)
    navigate('/error', {
      state: {
        status: 500,
        title: 'Failed to load employees',
        description: error.message,
      },
    });
  const handleEditEmployee = (id: string) => (event: unknown) =>
    void (
      {
        // throw new Error('Function not implemented.');
      }
    );
  function handleRemoveEmployee(id: string): void {
    if (id) {
      deleteEmployee({ variables: { Id: id } });
    } else {
      setAlert({
        status: 'danger',
        body: 'Please select a valid employee to delete',
        title: 'Invalid Employee Id',
      });
    }
  }
  return (
    <ContentScreen
      title={title}
      description={description}
      bodyClassName={classes.container}
    >
      {alert && alert.status === 'danger' && (
        <Alert
          autoHide={false}
          variant="danger"
          header={alert.title}
          body={alert.body}
          onClose={() => {
            setAlert(null);
          }}
        />
      )}
      {data && data.employees && (
        <EmployeeTable
          employees={data.employees}
          handleEditEmployee={handleEditEmployee}
          handleRemoveEmployee={handleRemoveEmployee}
        />
      )}
    </ContentScreen>
  );
};
export default EmployeePage;
