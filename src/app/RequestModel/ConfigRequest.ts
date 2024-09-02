export class PaymentAccountsListResponse {
    PaymentAccountID!: number;
    BankID!: number;
    Status!: number;
    StatusName!: string;
    AccountName!: string;
    AccountNo!: string;
    Ifsccode!: string;
    BranchName!: string;
    Branchcode!: string;
    Micrcode!: string;
    BranchAddress!: string;
    CreatedBy!: string;
    UpdatedBy!: string;
    BankName!: string;
    CreatedOn?: Date;
    UpdatedOn?: Date;

}
export class CommissionDistributionRequest {
    AgencyId?: number | null;
    ServiceId?: number | null;
    CalculationTypeId?: number | null;
    amount?: number | null;
    PlanId?: number | null;
}
export class TopupChargeRequest
{
    TopupChargeId?: number | null;
    SlabTypeId?: number | null;
    CalculationTypeId?: number | null;
    Amount?: number | null;
    
}


