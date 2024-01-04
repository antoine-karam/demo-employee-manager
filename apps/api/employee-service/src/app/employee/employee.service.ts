import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma.service';
import { Employee, Gender } from '../graphql';

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
          Postion: {
            select: {
              Title: true,
            },
          },
        },
      });
      if (employeesDBO && employeesDBO.length > 0) {
        const employees: Employee[] = employeesDBO.map((employee, index) => {
          const gender =
            employee.Gender == 'male' ? Gender.Male : Gender.Female;
          return {
            DateOfBirth: new Date(employee.DateOfBirth),
            Email: employee.Email,
            FirstName: employee.FirstName,
            Gender: gender,
            Id: employee.Id.toString(),
            LastName: employee.LastName,
            Position: employee.Postion?.Title ?? 'Default',
            Phone: employee.Phone,
            PrimaryAddress: generateEmployeeAddress(employee.Address),
            PictureUrl: generateEmployeePictureUrl(index, gender),
          };
        });
        return employees;
      }
    } catch (error) {
      this.logger.error('Error retrieving employees from database', error);
      throw error;
    }
  }
}
function generateEmployeeAddress(
  Address: { City: string; State: string; Country: string; Street: string }[]
): string {
  if (Address && Address.length > 0) {
    const firstAddress = Address[0];
    return `${firstAddress.Country} ${firstAddress.State} ${firstAddress.City} ${firstAddress.Street}`;
  }
  return '';
}
function generateEmployeePictureUrl(index: number, gender: Gender): string {
  return `https://randomuser.me/api/portraits/${
    gender == Gender.Male ? 'men' : 'women'
  }/${index}.jpg`;
}
