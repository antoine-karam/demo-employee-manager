
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

export class Employee {
    Id: string;
    Position: string;
    Gender: Gender;
    FirstName: string;
    LastName: string;
    Email: string;
    PictureUrl?: Nullable<string>;
    DateOfBirth: Date;
    Phone?: Nullable<string>;
    PrimaryAddress?: Nullable<string>;
}

export abstract class IQuery {
    abstract employees(): Nullable<Nullable<Employee>[]> | Promise<Nullable<Nullable<Employee>[]>>;
}

type Nullable<T> = T | null;
