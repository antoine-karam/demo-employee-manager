CREATE EXTENSION "uuid-ossp";

-- CreateTable
CREATE TABLE "Employee" (
    "Id" SERIAL NOT NULL,
    "Email" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Gender" TEXT NOT NULL,
    "DateOfBirth" TEXT NOT NULL,
    "Phone" TEXT,
    "PositionId" UUID NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Position" (
    "Id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "Title" TEXT NOT NULL,
    "Salary" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Address" (
    "Id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "City" TEXT NOT NULL,
    "State" TEXT NOT NULL,
    "Country" TEXT NOT NULL,
    "Street" TEXT NOT NULL,
    "EmployeeId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_PositionId_fkey" FOREIGN KEY ("PositionId") REFERENCES "Position"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_EmployeeId_fkey" FOREIGN KEY ("EmployeeId") REFERENCES "Employee"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
