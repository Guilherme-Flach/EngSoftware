export default interface IProposal {
    price: number;
    rescueRequestId: number;
    rescueProposalId: number;
    problem: string;
    rescuer: {
        account: {
            username: string
            email: string
        }
    }
}
