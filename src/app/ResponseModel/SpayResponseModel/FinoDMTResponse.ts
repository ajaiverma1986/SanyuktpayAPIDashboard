export class SpBaseResponse {
    status!: boolean;
    response_code!: string;
    message!: string | null;
    data:any;
}
export class FinoCustomerEkycResponse{
    ekyc_id!:string
    stateresp!:string
    mobile!:string
}
export class FinoCustomerLimitResponse
{
    limit!:string
    mobile!:string
}