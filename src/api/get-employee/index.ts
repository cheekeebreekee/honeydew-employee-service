import {
  enhancedApiHandler,
  getResourceName,
  config,
  HttpResponse,
} from "honeydew-shared";
import { DynamoDBService } from "src/services/dynamodb";

interface Event {
  pathParameters: {
    employeeId: string;
  };
}

export const handler = enhancedApiHandler(async (event: Event) => {
  const { employeeId } = event.pathParameters;

  console.log("config", config.store.shared);
  console.log(JSON.stringify(config));

  const employee = await DynamoDBService.employees.get(employeeId);

  return HttpResponse.success({
    body: employee,
  });
});
