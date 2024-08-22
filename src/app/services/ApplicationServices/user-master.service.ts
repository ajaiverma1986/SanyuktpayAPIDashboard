import { Injectable, SimpleChange } from '@angular/core';
import { BaseserviceService } from '../baseservice.service';
import { Observable } from 'rxjs/internal/Observable';
import { CreateApplicationRequest, SimpleResponse } from '../../RequestModel/MasterDatarESPONSE';
import { CreateOriginatorAccountRequest, CreateUserDetailAddressRequest, CreateUserDetailKyc, CreateUserWithLogoRequest, UploadOrgLogo1 } from '../../RequestModel/UserRequest';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class UserMasterService {

  constructor(private apiconnector: BaseserviceService,private http: HttpClient) {
  }

  UserOnboarding(PostData: CreateUserWithLogoRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/User/CreateNewUser", PostData);
  }
 
  UploadUserLogo(userid:number, file: File): Observable<SimpleResponse> {
    const formData: FormData = new FormData();

    formData.append('formFile', file,file.name);
    
    return this.apiconnector.PostFileAPI("/User/UploadUserLogo", formData);
  
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
  ListUserAccounts(): Observable<SimpleResponse> {

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
  ListApplication(): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/User/GetAllapplication");
  }
  CreateNewApplication(PostData: CreateApplicationRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/Config/CreateNewApplication", PostData);
  }
  ListUsers(): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/User/GetallUserByOrg");
  }
}
