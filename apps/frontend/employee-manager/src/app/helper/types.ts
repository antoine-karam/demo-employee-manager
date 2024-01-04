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
