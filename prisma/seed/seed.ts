import { Address, Employee, Position, PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import axios from 'axios';

const prisma = new PrismaClient();
function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function main() {
  console.log('Seeding 500 Employees from https://randomuser.me..');
  const positions: Position[] = [
    {
      Id: generateGUID(),
      Salary: new Decimal(1000),
      Title: 'Default',
    },
    {
      Id: generateGUID(),
      Salary: new Decimal(2000),
      Title: 'Intermediate',
    },
    {
      Id: generateGUID(),
      Salary: new Decimal(3000),
      Title: 'Senior',
    },
    {
      Id: generateGUID(),
      Salary: new Decimal(4000),
      Title: 'Manager',
    },
    {
      Id: generateGUID(),
      Salary: new Decimal(5000),
      Title: 'Director',
    },
  ];

  await prisma.position.createMany({ data: positions });

  const response = await axios.get('https://randomuser.me/api/?results=500');
  const data: any = response.data;
  const users: any[] = data.results;
  const employees: Omit<Employee, 'Id'>[] = users.map((i) => {
    const randomInt = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    return {
      FirstName: i.name.first,
      LastName: i.name.last,
      DateOfBirth: i.dob.date.split('T')[0],
      Email: i.email,
      Gender: i.gender,
      Phone: i.phone,
      PositionId: positions[randomInt - 1].Id,
    };
  });

  await prisma.employee.createMany({ data: employees });
  const dbEmployees = await prisma.employee.findMany()
  const addresses: Omit<Address, 'Id'>[] = users.map((i, index) => {
    return {
      City: i.location.city,
      Country: i.location.country,
      State: i.location.state,
      Street: i.location.street.name,
      EmployeeId: dbEmployees[index].Id
    };
  });
  await prisma.address.createMany({ data: addresses });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('🚨 Error on seed', e);
    await prisma.$disconnect();
    process.exit(1);
  });
