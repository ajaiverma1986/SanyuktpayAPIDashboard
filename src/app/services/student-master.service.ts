import { Injectable } from '@angular/core';
import { BaseserviceService } from './baseservice.service';
import { Observable } from 'rxjs';
import { SimpleResponse } from '../RequestModel/MasterDataResponse';
import { StudentListRequest, StudentRegistrationRequest } from '../RequestModel/StudentRequest';

@Injectable({
  providedIn: 'root'
})
export class StudentMasterService {

  constructor(private apiconnector: BaseserviceService) {
      }
    
      AddNewStudentRegistration(PostData: StudentRegistrationRequest): Observable<SimpleResponse> {
        console.log(PostData);
        return this.apiconnector.PostAPI("/Student/StudentRegistration", PostData);
      }
    
      ListStudent(PostData: StudentListRequest): Observable<SimpleResponse> {
       return this.apiconnector.PostAPI("/Student/ListStudent", PostData);
     }
}
