import { Module } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma.service';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';

@Module({
  providers: [EmployeeService, EmployeeResolver, PrismaService],
})
export class EmployeeModule {}
