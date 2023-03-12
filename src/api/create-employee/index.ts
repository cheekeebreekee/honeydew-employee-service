import {
  enhancedApiHandler,
  getResourceName,
  config,
  HttpResponse,
} from "honeydew-shared";
import {
  Provider,
  CareCoordinator,
  EnrollmentCoordinator,
  Administrator,
} from "honeydew-shared/types/Employee";
import { DynamoDBService } from "src/services/dynamodb";

interface Event {
  body: string;
}

export const handler = enhancedApiHandler(async (event: Event) => {
  const payload:
    | Provider
    | CareCoordinator
    | EnrollmentCoordinator
    | Administrator = JSON.parse(event.body as string);

  await DynamoDBService.employees.create(payload);

  return HttpResponse.success({});
});
