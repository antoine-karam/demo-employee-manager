import React, { useCallback, useRef, useState } from 'react';

import { AlertNotification, Employee } from '../../../../helper/types';

import Alert from '../../../../components/Alert/Alert';

import classes from './UpsertEmployee.module.less';
import ActionButton from '../../../../components/ActionButton/ActionButton';
import GeneralInfo, { Ref as generalInfoRef } from './Tabs/GeneralInfo';
import { scrollToTop } from '../../../../helper/general';
import { useMutation } from '@apollo/client';
import { ADD_EMPLOYEE, UPDATE_EMPLOYEE } from '../../graphql/mutations';

const UpsertEmployee: React.FC<{
  employee: Employee | undefined;
  positions: {
    Title: string;
  }[];
  handleCloseOffCanvas: () => void;
}> = ({ handleCloseOffCanvas, employee, positions }) => {
  const [updateEmployee] = useMutation<boolean>(UPDATE_EMPLOYEE, {
    refetchQueries: ['GetEmployees'],
  });
  const [addEmployee] = useMutation<boolean>(ADD_EMPLOYEE, {
    refetchQueries: ['GetEmployees'],
  });

  const generalInfoRef = useRef<generalInfoRef>(null);
  const [alert, setAlert] = useState<AlertNotification | null>(null);
  const handleSave = useCallback(async () => {
    let isContinue = true;
    try {
      const refs = generalInfoRef.current!.refs;
      const formIsValid = generalInfoRef.current!.formIsValid;
      for (const key in formIsValid.current) {
        if (formIsValid.current[key].isValidated === false) {
          isContinue = false;
          const val = refs[key].current.value;
          if (val.trim() === '') {
            refs[key].current.setValidation(
              formIsValid.current[key].requiredFeedback
            );
          }
        }
      }
      if (!isContinue) {
        scrollToTop('grid-off-canvas-body')();
        setAlert({
          status: 'warning',
          title: "You've got an error!",
          body: 'You have either missing or invalid fields',
        });
        return;
      }

      const body = {
        Id: employee?.Id ?? undefined,
        Gender: refs['gender'].current.value,
        FirstName: refs['firstName'].current.value,
        LastName: refs['lastName'].current.value,
        Position: refs['position'].current.value,
        Email: refs['email'].current.value,
        PictureUrl: employee?.PictureUrl ?? undefined,
        DateOfBirth: refs['dob'].current.value,
        Phone: refs['phone'].current.value,
        Address: {
          City: refs['city'].current.value,
          State: refs['state'].current.value,
          Country: refs['country'].current.value,
          Street: refs['street'].current.value,
        },
      };
      if (body.Id) {
        updateEmployee({ variables: { employee: body } });
      } else {
        addEmployee({ variables: { employee: body } });
      }
      handleCloseOffCanvas();
    } catch (error) {
      setAlert({
        status: 'danger',
        body: 'An error occurred while saving employee',
        title: 'Error While saving',
      });
    }
  }, []);

  return (
    <React.Fragment>
      {alert && alert.status === 'warning' && (
        <div className={classes.alertContainer}>
          <Alert
            autoHide={false}
            variant="danger"
            body={alert.body}
            header={alert.title}
            bodyClassName="text-center"
            headerClassName="text-center"
            onClose={() => setAlert(null)}
          />
        </div>
      )}
      <GeneralInfo
        employee={employee}
        ref={generalInfoRef}
        positions={positions}
      />
      <ActionButton
        handleCancel={handleCloseOffCanvas}
        handleSubmit={handleSave}
      />
    </React.Fragment>
  );
};

export default UpsertEmployee;
