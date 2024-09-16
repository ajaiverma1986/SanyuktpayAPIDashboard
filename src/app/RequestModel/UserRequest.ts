import { ListRequest } from "./BaseRequest";

export class CreateUserWithLogoRequest {
    UserTypeId!: number;
    MobileNo!: string;
    EmailId!: string;
    FirstName!: string;
    MiddleName!: string;
    LastName!: string;
}
export class UploadOrgLogo1 {
    iform!: File;
    UserId!: number;
}
export class CreateOriginatorAccountRequest {
    bankId!: number;
    accountName!: string;
    accountNo!: string;
    ifsccode!: string;
    branchAddress!: string;
}
export class CreateUserDetailAddressRequest {
    userId!: number;
    AddressTypeId!: number;
    Pincode!: string;
    Address1!: string;
    Address2!: string;
    Address3!: string;
    PincodeDataId!: number;
}
export class CreateUserDetailKyc {
    userId!: number;
    documentNo!: string;
    fileUrl!: string;
    kycID!: number;
}
export class UploadUserKYCFileRequest {
    kycID!: number;
    documentNo!: string;
}
export class UserKYYCResponse {
    UserKYCID!: number;
    UserId!: number;
    KycID!: number;
    DocumentNo!: string;
    KycTypeName!: string;
    FullName!: string;
    FileUrl!: string;
    StatusName!: string;
    CreatedBy!: string;
    UpdatedBy!: string;
    CreatedOn?: Date;
    UpdatedOn?: Date;
    Status!: number;

}
interface NgxSpinnerConfig {
    type?: string;
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
    CreatedBy!: string;
    UpdatedBy!: string;
    CreatedOn?: Date;
    UpdatedOn?: Date;
    Status!: number;
    Filename!:string

   
}
export class ListOrganisationDetailRequest extends ListRequest
{
     MobileNo!:string
     EmailId!:string;
    UserId!:number;

}
export class ApproveRejectUserDocumentRequest {
    UserKYCID!: number;
    Status!: number;
    RejectedReason!: string;

}
export class UserConfigurationRequest {
    UserId!: number;
    MinTxn!: number;
    MaxTxn!: number;
    ChargeTypeOn!: number;
    MaxPayinAmount!: number;
    MaxNoOfCountPayin!: number;
    SameAmountPayinAllowed!: number;
    PlanId!: number;
}
export class ActivateAPIUserRequest {
    UserId!: number;
    Status!: number;
    Reason!: string;
}
export class ActivateAPIUserMasterRequest {
    UserMasterId!: number;
    Status!: number;
    Reason!: string;
}
export class ListUserMasterRequest extends ListRequest {
    MobileNo!: string;
    EmailId!: string;
    UserMasterId!: number; 
}




