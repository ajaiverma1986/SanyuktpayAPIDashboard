import { Injectable, SimpleChange } from '@angular/core';
import { BaseserviceService } from '../baseservice.service';
import { Observable } from 'rxjs/internal/Observable';
import { SimpleResponse } from '../../RequestModel/MasterDatarESPONSE';
import { CreateUserWithLogoRequest, UploadOrgLogo1 } from '../../RequestModel/UserRequest';



@Injectable({
  providedIn: 'root'
})
export class UserMasterService {

  constructor(private apiconnector: BaseserviceService) {
  }

  UserOnboarding(PostData: CreateUserWithLogoRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/User/CreateNewUser", PostData);
  }
  UploadUserLogo(postdata :UploadOrgLogo1): Observable<SimpleResponse> {
   
    return this.apiconnector.PostAPI("/User/UploadUserLogo", postdata);
  }

}
