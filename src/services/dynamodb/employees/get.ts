import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import {
  CareCoordinator,
  Provider,
  EnrollmentCoordinator,
  Administrator,
  logError, logInfo,
  config
} from "honeydew-shared"

const dynamoDb = new DynamoDB({});

export const get = async (
  id: string
): Promise<Provider | CareCoordinator | EnrollmentCoordinator | Administrator> => {
  logInfo("Getting employee from DB", { id });

  const query = {
    TableName: config.getSharedValue("employeesTableName"),
    Key: marshall({
      id,
    }),
  };

  logInfo("Getting employee from DB query", query);

  const { Item } = await dynamoDb.getItem(query);

  if (!Item) {
    const message = `Employee with ID ${id} is not found`;
    logError(message);
    throw new Error(message);
  }

  logInfo("Employee found", Item);

  return unmarshall(Item) as Provider | CareCoordinator | EnrollmentCoordinator;
};
