export default interface IProposal {
    price: number;
    rescueProposalId: number;
    rescueRequest: {
        rescueRequestId: number;
        problem: string;
    }
    rescuer: {
        account: {
            username: string
            email: string
            phoneNumber: string
        }
    }
}
