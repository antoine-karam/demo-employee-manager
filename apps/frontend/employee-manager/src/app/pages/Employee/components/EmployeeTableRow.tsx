import React, { useCallback, useState } from 'react';
import { Card, Collapse, Image } from 'react-bootstrap';
import { FaPencil } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

import { Employee } from '../../../helper/types';
import noProfile from '../../../../assets/no-profile-picture.png';
import IconButton from '../../../components/IconButton/IconButton';

import classes from './EmployeeTableRow.module.less';

const EmployeeTableRow: React.FC<{
  employee: Employee;
  handleEdit: (id: string) => (event: unknown) => void;
  handleRemove: (id: string) => (event: unknown) => void;
}> = ({ employee, handleEdit, handleRemove }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleExpand = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <React.Fragment>
      <tr className={!open ? classes.collapsibleRow : undefined}>
        <td className={classes.expandContainer} onClick={handleExpand}>
          <span
            aria-controls={`deployment-details-${employee.Id}`}
            aria-expanded={open}
          >
            {open ? (
              <MdExpandLess size="1.2rem" />
            ) : (
              <MdExpandMore size="1.2rem" />
            )}
          </span>
        </td>
        <td>
          <Image
            alt="profile"
            src={employee.PictureUrl ?? noProfile}
            className={classes.img}
          />
        </td>
        <td>
          {employee.FirstName} {employee.LastName}
        </td>
        <td>{employee.Email}</td>
        <td>{employee.Position}</td>
        <td>{employee.Gender}</td>
        <td className={classes.actionsContainer}>
          <IconButton onClick={handleEdit(employee.Id)}>
            <FaPencil size="1.05rem" className={classes.actionIcon} />
          </IconButton>

          <IconButton onClick={handleRemove(employee.Id)}>
            <RiDeleteBin6Line size="1.05rem" className={classes.actionIcon} />
          </IconButton>
        </td>
      </tr>

      <tr className={classes.hiddenTr}></tr>
      <tr className={!open ? classes.collapsibleRow : undefined}>
        <td
          colSpan={10}
          className={!open ? classes.collapsibleColumn : undefined}
        >
          <Collapse in={open} unmountOnExit>
            <div
              id={`deployment-details-${employee.Id}`}
              className={classes.collapsibleContent}
            >
              <Card>
                <Card.Body>
                  <span>
                    <b>Address: </b>
                    {employee.PrimaryAddress}
                  </span>
                  <br />
                  <span className="pt-2">
                    <b>Phone: </b>
                    {employee.Phone}
                  </span>
                </Card.Body>
              </Card>
            </div>
          </Collapse>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default EmployeeTableRow;
