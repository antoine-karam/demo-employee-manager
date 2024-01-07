import { ReactNode } from 'react';

export type AlertNotification = {
  status: 'success' | 'warning' | 'danger';
  title: string;
  body: ReactNode;
};
export type Employee = {
  Id: string;
  Position: string;
  Gender: 'Male' | 'Female';
  FirstName: string;
  LastName: string;
  Email: string;
  PictureUrl?: string;
  DateOfBirth: Date;
  Phone?: string;
  PrimaryAddress?: string;
};

export type EmployeeAddress = {
  City: string;
  State: string;
  Country: string;
  Street: string;
};

type Formkey = {
  isValidated: boolean;
  requiredFeedback: string;
  feedback: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MapRefs = { [key: string]: any };
export type FormValid = {
  [key: string]: Formkey;
};
