import { Injectable, SimpleChange } from '@angular/core';
import { BaseserviceService } from '../baseservice.service';
import { Observable } from 'rxjs/internal/Observable';
import { CreateApplicationRequest, CreateNewUserRequest, SimpleResponse } from '../../RequestModel/MasterDatarESPONSE';
import { ActivateAPIUserMasterRequest, ActivateAPIUserRequest, AddIPAddressRequest, ApproveRejectIPAddressRequest, ApproveRejectUserDocumentRequest, ChangePasswordRequest, CreateOriginatorAccountRequest, CreateUserDetailAddressRequest, CreateUserDetailKyc, CreateUserWithLogoRequest, IPAddressListDetail, ListOrganisationDetailRequest, ListUserAddressRequest, ListUserMasterRequest, UploadOrgLogo1, UserConfigurationRequest } from '../../RequestModel/UserRequest';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ListResponse } from '../../RequestModel/BaseResponse';



@Injectable({
  providedIn: 'root'
})
export class UserMasterService {

  constructor(private apiconnector: BaseserviceService,private http: HttpClient) {
  }

  UserOnboarding(PostData: CreateUserWithLogoRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/User/CreateNewUser", PostData);
  }
 
  UploadUserLogo(fomd:FormData): Observable<SimpleResponse> {
   
    return this.apiconnector.PostFileAPI("/User/UploadUserLogo", FormData);
  
  }
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${environment.baseurl}/User/UploadUserLogo`, formData, {
      responseType: 'json',
    });

    return this.http.request(req);
  }


  AddUserAccounts(PostData: CreateOriginatorAccountRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/User/AddOriginatorAccounts", PostData);
  }
  ListUserAccounts(): Observable<ListResponse> {

    return this.apiconnector.GetAPI("/User/ListOriginatorAccounts");
  }
  AddUserAddress(PostData: CreateUserDetailAddressRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/User/AddUserAddress", PostData);
  }
  ListUserAddresses(): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/User/ListUserAddresses");
  }
  AddUserDeatilKYC(PostData: CreateUserDetailKyc): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/User/AddUserDeatilKYC", PostData);
  }
  ListUserKYC(): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/User/ListUserKYC");
  }
  ListUserKYCByUserId(UserId:number): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/User/ListUserKYCByUserId?UserId="+UserId);
  }
  ListApplication(): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/User/GetAllapplication");
  }
  CreateNewApplication(PostData: CreateApplicationRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/Config/CreateNewApplication", PostData);
  }
  ListUsers(): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/User/GetallUserByOrg");
  }
  CreateNewUserData(PostData: CreateNewUserRequest): Observable<SimpleResponse> {
    return this.apiconnector.PostAPI("/User/CreateNewAPIUser", PostData);
  }
  ListUserKYCByID(kycid:number): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/User/ListUserKYCById?KycId="+kycid);
  }
  DocumentView_Search(kycid:number): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/User/DocumentView_Search?KYCID="+kycid);
  }
  ListAllAppMenu(): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/User/ListAllMenu");
  }
  ListAllAppSubMenu(Menuid:number): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/User/ListAllsubMenu?Menuid="+Menuid);
  }
  GetOrganisationDetails(): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/User/GetAllUserDetails");
  }
  ListOrganisationDetails(postdata:ListOrganisationDetailRequest): Observable<ListResponse> {

    return this.apiconnector.PostAPI("/User/GetAllOrganisationDetails",postdata);
  }
  ApproveRejectUserdoc(PostData: ApproveRejectUserDocumentRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/User/ApproveRejectUserDocument", PostData);
  }
  GetAllUserConfigration(UserId:number): Observable<ListResponse> {

    return this.apiconnector.GetAPI("/User/GetAllUserConfigration?UserId="+UserId);
  }
  UpdateUserconfiguration(PostData: UserConfigurationRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/User/UpDateUserConfigrationDetails", PostData);
  }
  ActivateDeactivateApiUser(PostData: ActivateAPIUserRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/User/ActivateDeactivateApiUser", PostData);
  }
  ActivateDeactivateUserMaster(PostData: ActivateAPIUserMasterRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/User/ActivateDeactivateUserMaster", PostData);
  }
  GetAllUserMasterList(postdata:ListUserMasterRequest): Observable<ListResponse> {

    return this.apiconnector.PostAPI("/User/GetAllUserMasterList",postdata);
  }
  ListUserAddress(postdata:ListUserAddressRequest): Observable<ListResponse> {

    return this.apiconnector.PostAPI("/User/ListUserAddress",postdata);
  }
  ChangePassword(PostData: ChangePasswordRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/User/ChangePassword", PostData);
  }
  AddIPAddress(PostData: AddIPAddressRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/User/AddIPAddress", PostData);
  }
  GetallUserIPAddress(UserId:number): Observable<ListResponse> {

    return this.apiconnector.GetAPI("/User/GetallIPAdress?UserId="+UserId);
  }
  ApproveRejectIP(PostData: ApproveRejectIPAddressRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/User/ApproveRejectIP", PostData);
  }
  
  ListAllIPAddress(postdata:IPAddressListDetail): Observable<ListResponse> {

    return this.apiconnector.PostAPI("/User/GetAllIPAddressforAdmin",postdata);
  }
  ListApplicationForAdmin(UserId:number): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/User/GetAllapplicationForAdmin?UserId="+UserId);
  }
}
