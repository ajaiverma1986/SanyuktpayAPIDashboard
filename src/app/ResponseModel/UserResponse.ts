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
     StatusName!:string;
     Status!:number;
   
}
export class UserConfigurationResponse {
    ConfigurationId!: number;
    UserId!: number;
    MinTxn!: number;
    MaxTxn!: number;
    ChargeTypeOn!: number;
    ChargeDeductionType!: string;
    MaxPayinamount!: number;
    MaxNoofcountPayin!: number;
    SameAmountPayinAllowed!: number;
    PlanId!: number;
    PlanName!: string;

}