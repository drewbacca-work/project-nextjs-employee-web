export interface IApiUserInterface {
  id: number;
  avatar: string | undefined;
  email: string;
  first_name: string;
  last_name: string;
  salary?: number;
  age?: number;
}
