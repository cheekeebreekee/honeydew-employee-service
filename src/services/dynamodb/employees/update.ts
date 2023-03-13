import { DynamoDB, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import {
  Provider,
  CareCoordinator,
  EnrollmentCoordinator,
  Administrator,
  logError,
  logInfo,
  config,
} from "honeydew-shared";
import { DynamoDBService } from "../index";

const dynamoDb = new DynamoDB({});

export const update = async (
  employeePartial: Partial<
    Provider | CareCoordinator | EnrollmentCoordinator | Administrator
  >
) => {
  logInfo("Updating employee in DB", employeePartial);

  if (!employeePartial.id) {
    const message = "No employee ID found in partial";
    logError(message);
    throw new Error(message);
  }

  const employee = await DynamoDBService.employees.get(
    employeePartial.id || ""
  );

  logInfo("Employee to update", employee);

  const updatedEmployee: Provider | CareCoordinator | EnrollmentCoordinator = {
    ...employee,
    ...employeePartial,
  };

  logInfo("Updated employee data", updatedEmployee);

  const query: UpdateItemCommandInput = {
    TableName: config.getSharedValue("employeesTableName"),
    Key: marshall({
      id: updatedEmployee.id,
    }),
    UpdateExpression:
      "set #firstName=:FIRST_NAME, #lastName=:LAST_NAME, #phone=:PHONE, #title=:TITLE",
    ExpressionAttributeNames: {
      "#firstName": "firstName",
      "#lastName": "lastName",
      "#phone": "phone",
      "#title": "title",
    },
    ExpressionAttributeValues: marshall({
      ":FIRST_NAME": updatedEmployee.firstName,
      ":LAST_NAME": updatedEmployee.lastName,
      ":PHONE": updatedEmployee.phone,
      ":TITLE": updatedEmployee.title,
    }),
    ReturnValues: "ALL_NEW",
  };

  logInfo("Update employee query", query);

  const { Attributes } = await dynamoDb.updateItem(query);

  return unmarshall(Attributes as any) as
    | Provider
    | CareCoordinator
    | EnrollmentCoordinator;
};
