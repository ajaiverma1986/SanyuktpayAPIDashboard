import { Injectable, SimpleChange } from '@angular/core';
import { BaseserviceService } from '../baseservice.service';
import { Observable } from 'rxjs/internal/Observable';
import { CreateApplicationRequest, CreateNewUserRequest, SimpleResponse } from '../../RequestModel/MasterDatarESPONSE';
import { ApproveRejectUserDocumentRequest, CreateOriginatorAccountRequest, CreateUserDetailAddressRequest, CreateUserDetailKyc, CreateUserWithLogoRequest, ListOrganisationDetailRequest, UploadOrgLogo1, UserConfigurationRequest } from '../../RequestModel/UserRequest';
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
 
}
