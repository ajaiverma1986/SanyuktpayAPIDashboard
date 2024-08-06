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