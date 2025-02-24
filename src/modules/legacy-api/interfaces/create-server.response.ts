export class CreateServerResponse {
  success: boolean;

  password: string;

  id: string;

  errors: { [key: string]: string[] };
}
