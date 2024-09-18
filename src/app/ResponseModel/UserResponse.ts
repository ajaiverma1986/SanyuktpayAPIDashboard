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
export class ListUserMasterResponse {
    UserMasterID!: number;
    UserTypeId!: number;
    UserTypename!: string;
    UserName!: string;
    OrganisationName!: string;
    ContactPerson!: string;
    MobileNo!: string;
    EmailId!: string;
    // UpdatedOn?: Date; // Uncomment if needed
    UpdatedBy!: string;
    StatusName!: string;
    Status!: number;

}
export class UserAddressListResponse {
    UserAddressID!: number;
    UserID!: number;
    AddressTypeId!: number;
    PincodeDataId!: number;
    Address1!: string;
    Address2!: string;
    Address3!: string;
    AddressTypeName!: string;
    StatusName!: string;
    AreaName!: string;
    SubDistrictName!: string;
    DistrictName!: string;
    StateName!: string;
    CreatedBy!: string;
    Pincode!: string;
    UpdatedBy!: string;
    CreatedOn?: Date;
    UpdatedOn?: Date;
    Status!: number;

}
export class GetIPAddressResponse {
    IPAddressId!: number;
    ApplicationId!: number;
    OrganisationName!: string;
    ApplicationName!: string;
    StatusName!: string;
    CreatedBy!: string;
    UpdatedBy!: string;
    IPAddress!: string;
    CreatedOn?: Date;
    UpdatedOn?: Date;
    Status!: number;
}