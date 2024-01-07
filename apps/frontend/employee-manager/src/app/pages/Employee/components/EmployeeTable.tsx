import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux';
import EmployeeTableRow from './EmployeeTableRow';
import { AlertNotification, Employee } from '../../../helper/types';
import CustomPagination from '../../../components/Pagination/CustomPagination';

import classes from './EmployeeTable.module.less';

export type EmployeeTableProps = {
  employees: Employee[];
  handleEditEmployee: (id: string) => (event: unknown) => void;
  handleRemoveEmployee: (id: string) => void;
};

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  handleEditEmployee,
  handleRemoveEmployee,
}) => {
  const { keyword } = useSelector((state: RootState) => state.ui);

  const [popupData, setPopUpData] = useState<AlertNotification | undefined>(
    undefined
  );

  const [filteredEmployees, setFilteredEmployees] =
    useState<Employee[]>(employees);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredEmployees.slice(firstItemIndex, lastItemIndex);

  const employeeToDelete = useRef<Employee | undefined>(undefined);

  useEffect(() => {
    if (keyword !== '') {
      const employeesFiltered = employees.filter((el) => {
        return (
          el.FirstName.toLowerCase().includes(keyword.toLowerCase()) ||
          el.LastName.toLowerCase().includes(keyword.toLowerCase()) ||
          el.Email.toLowerCase().includes(keyword.toLowerCase()) ||
          el.Position.toLowerCase().includes(keyword.toLowerCase()) ||
          el.Gender.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setFilteredEmployees(employeesFiltered);
    } else {
      setFilteredEmployees(employees);
    }
  }, [employees, keyword]);

  const handleRemoveClick = useCallback(
    (indexRow: string) => (event: unknown) => {
      const selectedEmployee: Employee | undefined = filteredEmployees.find(
        (item: Employee) => item.Id === indexRow
      );
      if (selectedEmployee) {
        employeeToDelete.current = selectedEmployee;
        setPopUpData({
          status: 'warning',
          title: 'Remove Employee',
          body: (
            <span>
              Are you sure you want to remove{' '}
              <b>
                {selectedEmployee.FirstName} {selectedEmployee.LastName}
              </b>{' '}
              from the list of employees?
            </span>
          ),
        });
      }
    },
    [filteredEmployees]
  );

  const handleClosePopUp = useCallback(() => setPopUpData(undefined), []);

  return (
    <React.Fragment>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className={`${classes.header} ${classes.accordion}`}></th>
            <th className={classes.header}>Profile</th>
            <th className={classes.header}>Full Name</th>
            <th className={classes.header}>Email</th>
            <th className={classes.header}>Position</th>
            <th className={classes.header}>Gender</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((employee, index) => (
            <EmployeeTableRow
              key={index}
              employee={employee}
              handleEdit={handleEditEmployee}
              handleRemove={handleRemoveClick}
            />
          ))}
        </tbody>
      </Table>
      <CustomPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        items={filteredEmployees}
      />
      <Modal
        animation={true}
        onHide={handleClosePopUp}
        show={popupData && popupData.status === 'warning'}
      >
        <Modal.Header closeButton>
          <Modal.Title>{popupData?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{popupData?.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClosePopUp}>
            Cancel
          </Button>
          <Button
            className="light-btn-danger"
            onClick={() => {
              handleRemoveEmployee(employeeToDelete.current?.Id ?? '');
              handleClosePopUp();
            }}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
export default EmployeeTable;
