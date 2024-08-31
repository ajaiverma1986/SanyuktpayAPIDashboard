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
export class OriginatorListAccountResponse {
    OriginatorAccountID!: number;
    UserId!: number;
    BankId!: number;
    AccountName!: string;
    AccountNo!: string;
    Ifsccode!: string;
    BranchAddress!: string;
    StatusName!: string;
    BankName!: string;
    Usercode!: string;
    Fullname!: string;
    Filename!: string;
    CreatedBy!: string;
    UpdatedBy!: string;
    CreatedOn?: Date;
    UpdatedOn?: Date;
    Status!: number;
}


