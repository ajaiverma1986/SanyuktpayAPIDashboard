import { ListRequest } from "./BaseRequest";

export class StudentRegistrationRequest {
    FirstName!: string;
    LastName!: string;
    EmailId!: string;
    MobileNo!: string;
    DOB!: string | null;
    ClassId!: number;
}
export class StudentListRequest extends ListRequest {
    FromDate?: string | null;
    ToDate?: string | null;
    RegistrationID?: number | null;
    RegistrationNo?: string;
    MobileNo?: string;
}
export class StudentListResponse {
    FirstName!: string;
    LastName!: string;
    RegistrationID!: number;
    RegistrationNo!: string;
    MobileNo!: string;
    EmailId!: string;
    DOB?: Date;
    ClassId!: number;
    ClassName!: string;
    Status!: number
    Statusname!: string;
    CreatedOn!: Date;
    CreatedBy!: string;
    UpdatedBy!: string;
    UpdatedOn?: Date;
}