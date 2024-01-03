# EmployeeManager
This application is a demo showcase of an Employee Management web app.
It is built inside an NX workspace using the following technologies
- React
- NestJs (GraphQL)
- Prisma

## Start the app

To start the application run the following commands

Import the postgresql docker image and the pgadmin explorer
```
docker-compose up -d
```

Install the project dependencies
```
npm install
```

Run the prisma migration job
```
npm run prisma:migrate
```

Run the prisma seed operation (if it did not run previously)
```
npm run prisma:seed
```

Build both the front end and the backend apps
```
 npm run build
```

Serve the applications
```
 npm run start
```

## Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.



Feel free to collaborate on this github repo 😁