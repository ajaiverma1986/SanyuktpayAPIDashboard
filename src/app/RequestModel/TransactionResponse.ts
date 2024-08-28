export class PayinRequestListResponse {
    RequestID!: number;
    UserId!: number;
    PaymentChanelID!: number;
    PaymentModeId!: number;
    OriginatorAccountId!: number;
    BenficiaryAccountId!: number;
    Amount!: number;
    Charge?: number;
    RefNo1?: string;
    RefNo2?: string;
    Remarks?: string;
    RejectedReason?: string;
    CreatedBy?: string;
    UpdatedBy?: string;
    OriginatorBank?: string;
    OrgAccountName?: string;
    OrgAccountNo?: string;
    OrgIfsccode?: string;
    OrgBranchAddress?: string;
    BankName?: string;
    AccountName?: string;
    AccountNo?: string;
    BranchName?: string;
    Ifsccode?: string;
    Branchcode?: string;
    BranchAddress?: string;
    PaymentChanelName?: string;
    PaymentModeName?: string;
    Status!: number;
    StatusName?: string;
    CreatedOn?: Date;
    UpdatedOn?: Date;
    DepositDate?: Date;
}

