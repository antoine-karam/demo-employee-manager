import { Module } from '@nestjs/common';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { join } from 'path';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/employee.graphql'],
      path: '/api/graphql',
      definitions: {
        path: join(
          process.cwd(),
          'apps/api/employee-service/src/app/graphql.ts'
        ),
        outputAs: 'class',
      },
    }),
    EmployeeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
