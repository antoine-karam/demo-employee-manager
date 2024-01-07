
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Gender {
    Male = "Male",
    Female = "Female"
}

export class EmployeeInput {
    Id: string;
    Position: string;
    Gender: Gender;
    FirstName: string;
    LastName: string;
    Email: string;
    PictureUrl?: Nullable<string>;
    DateOfBirth: Date;
    Phone: string;
    Address: AddressInput;
}

export class AddressInput {
    City: string;
    State: string;
    Country: string;
    Street: string;
}

export class Employee {
    Id: string;
    Position: string;
    Gender: Gender;
    FirstName: string;
    LastName: string;
    Email: string;
    PictureUrl?: Nullable<string>;
    DateOfBirth: Date;
    Phone: string;
    PrimaryAddress: string;
}

export class Position {
    Title: string;
}

export class Address {
    City: string;
    State: string;
    Country: string;
    Street: string;
}

export abstract class IQuery {
    abstract employees(): Nullable<Nullable<Employee>[]> | Promise<Nullable<Nullable<Employee>[]>>;

    abstract positions(): Nullable<Nullable<Position>[]> | Promise<Nullable<Nullable<Position>[]>>;

    abstract address(id: string): Nullable<Address> | Promise<Nullable<Address>>;
}

export abstract class IMutation {
    abstract removeEmployee(id: string): boolean | Promise<boolean>;

    abstract updateEmployee(employee: EmployeeInput): Employee | Promise<Employee>;
}

type Nullable<T> = T | null;
