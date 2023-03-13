import { enhancedApiHandler, HttpResponse } from "honeydew-shared";
import { DynamoDBService } from "src/services/dynamodb";

export const handler = enhancedApiHandler(async () => {
  const employees = await DynamoDBService.employees.getAll();

  return HttpResponse.success({
    body: employees,
  });
});
