import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux';
import EmployeeTableRow from './EmployeeTableRow';
import { AlertNotification, Employee } from '../../../helper/types';
import CustomPagination from '../../../components/Pagination/CustomPagination';

import classes from './EmployeeTable.module.less';

export type EmployeeTableProps = {
  employees: Employee[];
  setAlert: (alert: AlertNotification | null) => void;
};

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  setAlert,
}) => {
  const { keyword } = useSelector((state: RootState) => state.ui);
  const [filteredEmployees, setFilteredEmployees] =
    useState<Employee[]>(employees);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredEmployees.slice(firstItemIndex, lastItemIndex);

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
  }, [keyword]);
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
              employee={employee}
              handleEdit={(id) => () => {
                console.log('edit id', id);
              }}
              handleRemove={(id) => () => {
                console.log('delete id', id);
              }}
            />
          ))}
        </tbody>
      </Table>
      <CustomPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        items={filteredEmployees}
      />
    </React.Fragment>
  );
};
export default EmployeeTable;
