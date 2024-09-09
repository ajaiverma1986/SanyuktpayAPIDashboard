export class PartnerDetailsResponse {
    UserId!: number;
    Usercode!: string;
    OrganisationName!: string;
    ContactPersonName!: string;
    MobileNo!: string;
    EmailId!: string;
    AvailableLimit?: number;

   
}
export class ListOrganisationResponse
{
     UserId!:number;
     Usercode!:string;
     OrganisationName!:string;
     ContactPerson!:string;
     MobileNo!:string;
     EmailId!:string
     UpdatedOn!:Date;
     UpdatedBy!:string;
   
}