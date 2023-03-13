import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { logInfo, config } from "honeydew-shared";

const dynamoDb = new DynamoDB({});

export const remove = async (id: string) => {
  logInfo("Delete employee from DB", { id });

  const query = {
    TableName: config.getSharedValue("employeesTableName"),
    Key: marshall({
      id,
    }),
  };

  logInfo("Delete employee from DB query", query);

  await dynamoDb.deleteItem(query);

  logInfo("Employee has been deleted successfully");
};
