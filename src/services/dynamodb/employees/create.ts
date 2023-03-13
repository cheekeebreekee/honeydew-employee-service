import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import {
  Provider,
  CareCoordinator,
  EnrollmentCoordinator,
  Administrator,
  logInfo,
  config,
} from "honeydew-shared";

const dynamoDb = new DynamoDB({});

export const create = async (
  employee: Provider | CareCoordinator | EnrollmentCoordinator | Administrator
) => {
  logInfo(`Create ${employee.role} employee in DB`, employee);

  const query = {
    TableName: config.getSharedValue("employeesTableName"),
    Item: marshall(employee),
  };

  logInfo("Create employee query", query);

  await dynamoDb.putItem(query);

  logInfo("Provider has been created successfully");
};
