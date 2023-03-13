import { enhancedApiHandler, HttpResponse } from "honeydew-shared";
import { DynamoDBService } from "src/services/dynamodb";

interface Event {
  pathParameters: {
    employeeId: string;
  };
}

export const handler = enhancedApiHandler(async (event: Event) => {
  const { employeeId } = event.pathParameters;

  await DynamoDBService.employees.remove(employeeId);

  return HttpResponse.success({});
});
