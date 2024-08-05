import { Injectable, SimpleChange } from '@angular/core';
import { BaseserviceService } from '../baseservice.service';
import { Observable } from 'rxjs/internal/Observable';
import { SimpleResponse } from '../../RequestModel/MasterDatarESPONSE';
import { CreateUserWithLogoRequest } from '../../RequestModel/UserRequest';



@Injectable({
  providedIn: 'root'
})
export class UserMasterService  {

 constructor(private apiconnector:BaseserviceService){
 }

 UserOnboarding(PostData:CreateUserWithLogoRequest): Observable<SimpleResponse> {
  console.log("i am from user service");
  return this.apiconnector.PostAPI("/User/CreateNewUser",PostData);
}

}
