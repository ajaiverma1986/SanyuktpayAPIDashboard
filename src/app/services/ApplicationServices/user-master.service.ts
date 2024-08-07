import { Injectable, SimpleChange } from '@angular/core';
import { BaseserviceService } from '../baseservice.service';
import { Observable } from 'rxjs/internal/Observable';
import { SimpleResponse } from '../../RequestModel/MasterDatarESPONSE';
import { CreateUserWithLogoRequest, UploadOrgLogo1 } from '../../RequestModel/UserRequest';
import { HttpEvent } from '@angular/common/http';



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

}
