export class StudentRegistrationRequest {
    FirstName!: string;
    LastName!: string;
    EmailId!: string;
    MobileNo!: string;
    DOB!: string | null;
    ClassId!: number;
}
export class StudentListRequest {
    FromDate?: Date | null;
    ToDate?: Date | null;
    RegistrationID?: number | null;
    RegistrationNo?: string;
    MobileNo?: string;
    UserMasterId?: number | null;
}