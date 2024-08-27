export class AddPaymentRequestRequest {
    PaymentChanelID!: number;
    PaymentModeId!: number;
    Amount?: number | null;
    Charge?: number | null;
    OriginatorAccountId!: number;
    BenficiaryAccountId!: number;
    DepositDate?: string | null;
    RefNo1?: string | null;
    RefNo2?: string | null;
    Remarks?: string | null;

   
}

