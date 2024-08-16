export default interface IRequest {
    rescueRequest: string;
    price: number;
    rescueProposalId: number;
    problem: string;
    creationDate: Date;
    isFinished: boolean;
    customer: {
        account: {
            username: string
            email: string
        }
    }
}
