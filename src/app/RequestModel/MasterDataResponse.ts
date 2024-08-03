export class BaseResponse {
    public HasError!: boolean;
    public Errors!: ErrorResponse[];
}
export class ErrorResponse {

    public ErrorCode!: string;
    public ErrorMessage!: string;
    public HasError!: boolean;
}
export class PlanMasterListResponse {
    planID!: number;
    planName!: string;
    status!: number;
    statusName!: string;
}
export class CompanyTypeMasterResponse {
    CompnayTypeId!: number;
    CompanyTypeName!: string;
    Status!: number;
    StatusName!: string;
}
export class SimpleResponse extends BaseResponse {
    public Result: any;
}
export class AddressTypeListResponse {
    AddressTypeId!: number;
    AddressTypeName!: string;
    Status!: number;
    StatusName!: string;
}
export class agencyMasterResponse {
    AgencyId!: number;
    AgencyName!: string;
    AgencyCode!: string;
    Status!: number;
    StatusName!: string;
}
export class BankListResponse {
    BankID!: number;
    BankName!: string;
    Status!: number;
    StatusName!: string;
}
export class StateListResponse {
    StateID!: number;
    StateCode!: string;
    StateName!: string;
}
interface TypeviewModel {
    value: string;
    viewValue: string;
  }
  export class DistrictListResponse {
    StateID!: number;
    DistrictID!: number;
    DistrictCode!: string;
    DistrictName!: string;
    StateName!: string;
}
export class KycTypeMasterListResponse {
    KycTypeID!: number;
    CompnayTypeId!: number;
    UserTypeId!: number;
    UserTypeName!: string;
    KycTypeName!: string;
    CompanyTypeName!: string;
    Status!: number;
    StatusName!: string;
}
export class UserTypeListResponse {
    UserTypeId!: number;
    UserTypeName!: string;
    StateName!: string;
}
export class PincodeDataResponse {
    StateID!: number;
    DistrictID!: number;
    PincodeDataId!: number;
    AreaName!: string;
    DistrictName!: string;
    StateName!: string;
    Pincode!: string;
    SubDistrictName!: string;
}
export class LedgerTypeListResponse {
    LedgerTypeId!: number;
    LedgerTypeName!: string;
    Status!: number;
    StatusName!: string;
}
export class serviceTypeListResponse {
    ServiceTypeId!: number;
    AgencyId!: number;
    ServiceTypeName!: string;
    AgencyName!: string;
    Status!: number;
    StatusName!: string;
}
export class ListPaymentChanelResponse {
    PaymentChanelID!: number;
    PaymentChanelName!: string;
    Status!: number;
    
}
export class ListPaymentModeResponse {
    PaymentChanelID!: number;
    PaymentModeID!: number;
    PaymentChanelName!: string;
    PaymentModeName!: string;
    StatusName!: string;
    Status!: number;
    
}