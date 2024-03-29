import React, {
  forwardRef,
  MutableRefObject,
  ForwardRefRenderFunction,
  useRef,
  useCallback,
  useImperativeHandle,
  useEffect,
} from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import {
  Employee,
  EmployeeAddress,
  FormValid,
  MapRefs,
} from '../../../../../helper/types';
import Select, {
  Ref as SelectRef,
} from '../../../../../components/Select/Select';

import { countryOptions } from '../../../dropDownData';
import { scrollToTop } from '../../../../../helper/general';
import { GET_EMPLOYEE_ADDRESS } from '../../../graphql/queries';
import LoaderScreen from '../../../../../components/Loader/LoaderScreen';
import Input, { Ref as InputRef } from '../../../../../components/Input/Input';

import classes from './GeneralInfo.module.less';

import { useLazyQuery } from '@apollo/client';
type Component = {
  employee?: Employee;
  positions: {
    Title: string;
  }[];
};

export type Ref = {
  refs: MapRefs;
  handleClear: () => void;
  formIsValid: MutableRefObject<FormValid>;
};

const GeneralInfo: ForwardRefRenderFunction<Ref, Component> = (
  { employee, positions },
  ref
) => {
  const [getEmployeeAddress, { data, loading }] = useLazyQuery<{
    address: EmployeeAddress;
  }>(GET_EMPLOYEE_ADDRESS, { variables: { id: employee?.Id ?? '' } });
  const firstNameRef = useRef<InputRef>(null);
  const lastNameRef = useRef<InputRef>(null);
  const emailRef = useRef<InputRef>(null);
  const dobRef = useRef<InputRef>(null);
  const phoneRef = useRef<InputRef>(null);
  const genderRef = useRef<SelectRef>(null);
  const positionRef = useRef<SelectRef>(null);
  const countryRef = useRef<SelectRef>(null);
  const cityRef = useRef<InputRef>(null);
  const streetRef = useRef<InputRef>(null);
  const stateRef = useRef<InputRef>(null);

  const refs: MapRefs = {
    firstName: firstNameRef,
    lastName: lastNameRef,
    email: emailRef,
    dob: dobRef,
    gender: genderRef,
    position: positionRef,
    phone: phoneRef,
    country: countryRef,
    city: cityRef,
    street: streetRef,
    state: stateRef,
  };

  const formIsValid = useRef<FormValid>({
    firstName: {
      isValidated: false,
      requiredFeedback: "First Name can't be empty",
      feedback: 'Please provide a valid first name (at least 3 characters)',
    },
    lastName: {
      isValidated: false,
      requiredFeedback: "Last Name can't be empty",
      feedback: 'Please provide a valid last name (at least 3 characters)',
    },
    email: {
      isValidated: false,
      requiredFeedback: "Email can't be empty",
      feedback: 'Please provide a valid email',
    },
    dob: {
      isValidated: false,
      requiredFeedback: "Date Of Birth can't be empty",
      feedback: '',
    },
    city: {
      isValidated: false,
      requiredFeedback: "City can't be empty",
      feedback: '',
    },
    street: {
      isValidated: false,
      requiredFeedback: "Street can't be empty",
      feedback: '',
    },
    state: {
      isValidated: false,
      requiredFeedback: "State can't be empty",
      feedback: '',
    },
  });

  const handleChange = useCallback((id: string, value: string): string => {
    const trimmedValue = (value as string).trim();
    switch (id.toLowerCase()) {
      case 'firstname':
        if (trimmedValue === '') {
          formIsValid.current.firstName.isValidated = false;
          return formIsValid.current.firstName.requiredFeedback;
        }
        if (trimmedValue.length < 3) {
          formIsValid.current.firstName.isValidated = false;
          return formIsValid.current.firstName.feedback;
        }

        formIsValid.current.firstName.isValidated = true;
        return '';
      case 'lastname':
        if (trimmedValue === '') {
          formIsValid.current.lastName.isValidated = false;
          return formIsValid.current.lastName.requiredFeedback;
        }
        if (trimmedValue.length < 3) {
          formIsValid.current.lastName.isValidated = false;
          return formIsValid.current.lastName.feedback;
        }

        formIsValid.current.lastName.isValidated = true;
        return '';
      case 'email':
        if (trimmedValue === '') {
          formIsValid.current.email.isValidated = false;
          return formIsValid.current.email.requiredFeedback;
        }
        if (!/^\S+@\S+\.\S+$/.test(trimmedValue)) {
          formIsValid.current.email.isValidated = false;
          return formIsValid.current.email.feedback;
        }
        formIsValid.current.email.isValidated = true;
        return '';
      case 'dob':
        if (trimmedValue === '') {
          formIsValid.current.dob.isValidated = false;
          return formIsValid.current.dob.requiredFeedback;
        }
        formIsValid.current.dob.isValidated = true;
        return '';
      case 'state':
        if (trimmedValue === '') {
          formIsValid.current.state.isValidated = false;
          return formIsValid.current.state.requiredFeedback;
        }
        formIsValid.current.state.isValidated = true;
        return '';
      case 'street':
        if (trimmedValue === '') {
          formIsValid.current.street.isValidated = false;
          return formIsValid.current.street.requiredFeedback;
        }
        formIsValid.current.street.isValidated = true;
        return '';
      case 'city':
        if (trimmedValue === '') {
          formIsValid.current.city.isValidated = false;
          return formIsValid.current.city.requiredFeedback;
        }
        formIsValid.current.city.isValidated = true;
        return '';
      default:
        if (formIsValid.current[id]) formIsValid.current[id].isValidated = true;
        return '';
    }
  }, []);

  const updateInputStatus = useCallback((val: boolean) => {
    for (const key in formIsValid.current) {
      formIsValid.current[key].isValidated = val;
    }
  }, []);

  const handleClear = useCallback(() => {
    updateInputStatus(false);
    scrollToTop('grid-off-canvas-body')();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (employee?.Id) {
      getEmployeeAddress();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    refs: refs,
    handleClear: handleClear,
    formIsValid: formIsValid,
  }));

  if (loading) return <LoaderScreen text="Loading" />;
  const employeeAddress = data?.address;
  return (
    <div className={classes.infoContainer}>
      <Container>
        <Row>
          <Col md={6}>
            <Input
              required
              id="firstName"
              ref={firstNameRef}
              label="First Name"
              onHandleChange={handleChange}
              value={employee?.FirstName}
            />
          </Col>
          <Col md={6}>
            <Input
              required
              id="lastName"
              ref={lastNameRef}
              label="Last Name"
              onHandleChange={handleChange}
              value={employee?.LastName}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Input
              required
              id="email"
              ref={emailRef}
              label="Email"
              onHandleChange={handleChange}
              value={employee?.Email}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Input
              required
              id="dob"
              type="date"
              ref={dobRef}
              label="Date Of Birth"
              onHandleChange={handleChange}
              value={employee?.DateOfBirth.toString().split('T')[0]}
            />
          </Col>
          <Col md={6}>
            <Select
              required
              id="gender"
              label="Gender"
              ref={genderRef}
              value={employee?.Gender ?? 'Male'}
              options={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Input
              id="phone"
              type="text"
              ref={phoneRef}
              label="Phone Number"
              value={employee?.Phone}
            />
          </Col>
          <Col md={6}>
            <Select
              id="position"
              label="Position"
              ref={positionRef}
              value={employee?.Position ?? 'Default'}
              options={positions.map((i) => {
                return { label: i.Title, value: i.Title };
              })}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h5>Address</h5>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Select
              required
              id="country"
              label="Country"
              ref={countryRef}
              value={employeeAddress?.Country}
              options={countryOptions}
            />
          </Col>
          <Col md={6}>
            <Input
              required
              id="state"
              ref={stateRef}
              label="State"
              onHandleChange={handleChange}
              value={employeeAddress?.State}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Input
              required
              id="city"
              ref={cityRef}
              label="City"
              onHandleChange={handleChange}
              value={employeeAddress?.City}
            />
          </Col>
          <Col md={6}>
            <Input
              required
              id="street"
              ref={streetRef}
              label="Street"
              onHandleChange={handleChange}
              value={employeeAddress?.Street}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default forwardRef<Ref, Component>(GeneralInfo);
