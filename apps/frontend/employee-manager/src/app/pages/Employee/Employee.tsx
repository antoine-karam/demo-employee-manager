import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Offcanvas, Image } from 'react-bootstrap';

import { useMutation, useQuery } from '@apollo/client';
import { GET_EMPLOYEES } from './graphql/queries';
import { DELETE_EMPLOYEE } from './graphql/mutations';

import Alert from '../../components/Alert/Alert';
import EmployeeTable from './components/EmployeeTable';
import LoaderScreen from '../../components/Loader/LoaderScreen';
import ContentScreen from '../../components/Content/ContentScreen';

import { AlertNotification, Employee } from '../../helper/types';
import noProfile from '../../../assets/no-profile-picture.png';
import classes from './Employee.module.less';
import UpsertEmployee from './components/OffCanvas/UpsertEmployee';

const EmployeePage: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery<{
    employees: [];
    positions: { Title: string }[];
  }>(GET_EMPLOYEES);
  const [deleteEmployee] = useMutation<boolean>(DELETE_EMPLOYEE, {
    refetchQueries: ['GetEmployees'],
  });

  const [alert, setAlert] = useState<AlertNotification | null>(null);
  const [isEditEmployee, setIsEditEmployee] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<
    Employee | undefined
  >();

  if (loading) return <LoaderScreen text="Loading" />;
  if (error)
    navigate('/error', {
      state: {
        status: 500,
        title: 'Failed to load employees',
        description: error.message,
      },
    });

  const handleEditEmployee = (id: string) => (event: unknown) => {
    setIsEditEmployee(true);
    const selectedEmployees: Employee[] = (
      data?.employees as Employee[]
    ).filter((employee: Employee) => employee.Id === id);
    selectedEmployees?.length > 0
      ? setSelectedEmployee(selectedEmployees[0])
      : setIsEditEmployee(false);
  };
  const handleRemoveEmployee = (id: string) => {
    if (id) {
      deleteEmployee({ variables: { Id: id } });
    } else {
      setAlert({
        status: 'danger',
        body: 'Please select a valid employee to delete',
        title: 'Invalid Employee Id',
      });
    }
  };
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
      <Offcanvas
        placement="end"
        onHide={() => {
          setIsEditEmployee(false);
          setSelectedEmployee(undefined);
        }}
        className={classes.offCanvas}
        show={isEditEmployee}
      >
        <Offcanvas.Header closeButton className={classes.offCanvasHeader}>
          <Offcanvas.Title>
            <div className={classes.offCanvasTitleContainer}>
              <Image
                roundedCircle
                alt="User Profile"
                className={`${classes.img} mx-auto mb-4`}
                src={selectedEmployee?.PictureUrl ?? noProfile}
              ></Image>
              <div className={classes.offCanvasTitle}>
                {isEditEmployee &&
                  `Edit Employee - ${selectedEmployee?.FirstName} ${selectedEmployee?.LastName}`}
              </div>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
          id="grid-off-canvas-body"
          className={classes.offCanvasBody}
        >
          <UpsertEmployee
            employee={selectedEmployee}
            handleCloseOffCanvas={() => {
              setIsEditEmployee(false);
              setSelectedEmployee(undefined);
            }}
            positions={data?.positions ?? []}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </ContentScreen>
  );
};
export default EmployeePage;
