import { Injectable, SimpleChange } from '@angular/core';
import { BaseserviceService } from '../baseservice.service';
import { Observable } from 'rxjs/internal/Observable';
import { SimpleResponse } from '../../RequestModel/MasterDatarESPONSE';
import { CreateOriginatorAccountRequest, CreateUserDetailAddressRequest, CreateUserDetailKyc, CreateUserWithLogoRequest, UploadOrgLogo1 } from '../../RequestModel/UserRequest';



@Injectable({
  providedIn: 'root'
})
export class UserMasterService {

  constructor(private apiconnector: BaseserviceService) {
  }

  UserOnboarding(PostData: CreateUserWithLogoRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/User/CreateNewUser", PostData);
  }
 
  UploadUserLogo(userid:number, file: File): Observable<SimpleResponse> {
    const formData: FormData = new FormData();

    formData.append('formFile', file,file.name);
    
    return this.apiconnector.PostFileAPI("/User/UploadUserLogo", formData);
  
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
}
