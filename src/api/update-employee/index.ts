import {
  enhancedApiHandler,
  Administrator,
  HttpResponse,
} from "honeydew-shared";
import {
  Provider,
  CareCoordinator,
  EnrollmentCoordinator,
} from "honeydew-shared/types/Employee";
import { DynamoDBService } from "src/services/dynamodb";

interface Event {
  body: string;
}

export const handler = enhancedApiHandler(async (event: Event) => {
  const payload: Partial<
    Provider | CareCoordinator | EnrollmentCoordinator | Administrator
  > = JSON.parse(event.body as string);

  const updatedEmployee = await DynamoDBService.employees.update(
    payload
  );

  return HttpResponse.success({
    body: updatedEmployee,
  });
});
