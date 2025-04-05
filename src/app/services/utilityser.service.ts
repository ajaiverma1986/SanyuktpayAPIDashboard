import { Injectable } from '@angular/core';
import { BaseserviceService } from './baseservice.service';
import { Observable } from 'rxjs';
import { SimpleResponse } from '../RequestModel/MasterDataResponse';
import { OTPRequest, OTPValidateRequest } from '../RequestModel/UtilityRequest';

@Injectable({
  providedIn: 'root'
})
export class UtilityserService {

 constructor(private apiconnector: BaseserviceService) {
     }
   
     GenerateOTP(PostData: OTPRequest): Observable<SimpleResponse> {
       return this.apiconnector.PostAPI("/Utility/SendOTP", PostData);
     }
   
     ValidateOTP(PostData: OTPValidateRequest): Observable<SimpleResponse> {
      return this.apiconnector.PostAPI("/Utility/ValidateOTP", PostData);
    }
}
