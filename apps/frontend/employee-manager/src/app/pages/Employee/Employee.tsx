import React, { useState } from 'react';

import { useQuery } from '@apollo/client';
import { GET_EMPLOYEES } from './graphql/queries';

import { AlertNotification } from '../../helper/types';

import Alert from '../../components/Alert/Alert';
import LoaderScreen from '../../components/Loader/LoaderScreen';
import ContentScreen from '../../components/Content/ContentScreen';

import classes from './Employee.module.less';
import EmployeeTable from './components/EmployeeTable';
import { useNavigate } from 'react-router-dom';

const EmployeePage: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<{employees:[]}>(GET_EMPLOYEES);
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
        <EmployeeTable employees={data.employees} setAlert={setAlert}></EmployeeTable>
      )}
    </ContentScreen>
  );
};
export default EmployeePage;
