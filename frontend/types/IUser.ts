import IRequest from "./IRequest";

export default interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;

  requests: IRequest[]
}
