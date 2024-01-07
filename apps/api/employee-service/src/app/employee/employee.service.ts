import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../lib/prisma.service';
import { Address, Employee, EmployeeInput, Gender, Position } from '../graphql';
import { generateAddress } from '../../lib/helper';
import { Employee as DBEmployee, Address as DBAddress } from '@prisma/client';

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name);
  constructor(private readonly db: PrismaService) {}

  async get(): Promise<Employee[]> {
    try {
      const employeesDBO = await this.db.employee.findMany({
        include: {
          Address: {
            select: {
              City: true,
              Country: true,
              State: true,
              Street: true,
            },
          },
          Position: {
            select: {
              Title: true,
            },
          },
        },
        where: {
          IsDeleted: false,
        },
      });
      if (employeesDBO && employeesDBO.length > 0) {
        const employees: Employee[] = employeesDBO.map((employee) => {
          const gender =
            employee.Gender == 'male' ? Gender.Male : Gender.Female;
          return {
            DateOfBirth: new Date(employee.DateOfBirth),
            Email: employee.Email,
            FirstName: employee.FirstName,
            Gender: gender,
            Id: employee.Id.toString(),
            LastName: employee.LastName,
            Position: employee.Position?.Title ?? 'Default',
            Phone: employee.Phone,
            PrimaryAddress: generateAddress(employee.Address),
            PictureUrl: employee.PictureUrl,
          };
        });
        return employees;
      }
    } catch (error) {
      this.logger.error('Error retrieving employees from database', error);
      throw error;
    }
  }
  async getPositions(): Promise<Position[]> {
    try {
      const positionsDBO = await this.db.position.findMany();
      if (positionsDBO && positionsDBO.length > 0) {
        return positionsDBO.map((i) => {
          return { Title: i.Title };
        });
      }
    } catch (error) {
      this.logger.error('Error retrieving employees from database', error);
      throw error;
    }
  }

  async getAddress(id: string): Promise<Address> {
    try {
      const employeeId = parseInt(id, 10);
      if (isNaN(employeeId)) {
        throw new BadRequestException('Invalid employee ID');
      }
      const addressDBO = await this.db.address.findFirst({
        where: {
          EmployeeId: employeeId,
        },
      });
      if (addressDBO) {
        return {
          City: addressDBO.City,
          Country: addressDBO.Country,
          State: addressDBO.State,
          Street: addressDBO.Street,
        };
      }
    } catch (error) {
      this.logger.error('Error retrieving employees from database', error);
      throw error;
    }
  }
  async delete(id: string): Promise<boolean> {
    try {
      const employeeId = parseInt(id, 10);
      if (isNaN(employeeId)) {
        throw new BadRequestException('Invalid employee ID');
      }
      const result = await this.db.employee.update({
        data: {
          IsDeleted: true,
        },
        where: {
          Id: employeeId,
        },
      });
      return result.IsDeleted;
    } catch (error) {
      this.logger.error('Error deleting employees from database', error);
      throw error;
    }
  }

  async update(employee: EmployeeInput): Promise<Employee> {
    try {
      const employeeId = parseInt(employee.Id, 10);
      const employeeDOB = new Date(employee.DateOfBirth);
      if (isNaN(employeeId)) {
        throw new BadRequestException('Invalid employee ID');
      }
      const existingEmployee = await this.db.employee.findUnique({
        include: {
          Address: true,
        },
        where: {
          Id: employeeId,
        },
      });
      if (!existingEmployee) {
        throw new NotFoundException(`Employee with ID ${employeeId} not found`);
      }
      const updatedAddress = employee.Address
        ? await this.updateAddress(employee, existingEmployee, employeeId)
        : undefined;

      let positionId = existingEmployee.PositionId;
      if (employee.Position) {
        const { Id: newPositionId } = await this.db.position.findFirst({
          select: { Id: true },
          where: { Title: employee.Position },
        });
        positionId = newPositionId;
      }
      const result = await this.db.employee.update({
        data: {
          Address: {
            update: {
              where: {
                Id: updatedAddress.Id,
              },
              data: updatedAddress,
            },
          },
          PositionId: positionId,
          DateOfBirth: `${employeeDOB.getFullYear()}-${employeeDOB.getMonth()}-${employeeDOB.getDate()}`,
          Email: employee.Email,
          FirstName: employee.FirstName,
          Gender: employee.Gender == Gender.Male ? 'male' : 'female',
          LastName: employee.LastName,
          Phone: employee.Phone,
          PictureUrl: employee.PictureUrl,
        },
        where: { Id: employeeId },
      });
      const gender = result.Gender == 'male' ? Gender.Male : Gender.Female;
      return {
        DateOfBirth: new Date(result.DateOfBirth),
        Email: result.Email,
        FirstName: result.FirstName,
        Gender: gender,
        Id: result.Id.toString(),
        LastName: result.LastName,
        Position: employee.Position ?? 'Default',
        Phone: result.Phone,
        PrimaryAddress: generateAddress([employee.Address]),
        PictureUrl: result.PictureUrl,
      };
    } catch (error) {
      this.logger.error('Error updating employee in database', error);
      throw error;
    }
  }

  private async updateAddress(
    employee: EmployeeInput,
    existingEmployee: {
      Address: DBAddress[];
    } & DBEmployee,
    employeeId: number
  ) {
    const addressUpdate = {
      City: employee.Address.City,
      Country: employee.Address.Country,
      State: employee.Address.State,
      Street: employee.Address.Street,
      Id: undefined,
    };
    if (existingEmployee.Address && existingEmployee.Address.length > 0) {
      addressUpdate.Id = existingEmployee.Address[0].Id;
    } else {
      const { Id: addressId } = await this.db.address.create({
        data: { ...addressUpdate, EmployeeId: employeeId },
        select: { Id: true },
      });
      addressUpdate.Id = addressId;
    }
    return addressUpdate;
  }
}
