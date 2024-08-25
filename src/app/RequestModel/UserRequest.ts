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
    userId!: number;
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


