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

