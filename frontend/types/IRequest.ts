export default interface IRequest {
  rescueRequestId: number;
  location: string;
  problem: string;
  creationDate: Date;
  isFinished: boolean;
  customer: {
    account: {
      username: string
      email: string
      phoneNumber: string,
    }
  }
}
