import { Injectable } from '@angular/core';
import { BaseserviceService } from './baseservice.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimpleResponse } from '../RequestModel/MasterDataResponse';
import { CreateRoleRequest, GetRoleRequest } from '../RequestModel/SysMgrRequest';

@Injectable({
  providedIn: 'root'
})
export class SysMgrService {

  constructor(private apiconnector: BaseserviceService,private http: HttpClient) {
    }
  
    CreateNewRoles(PostData: CreateRoleRequest): Observable<SimpleResponse> {
  
      return this.apiconnector.PostAPI("/SysMgr/CreateNewRole", PostData);
    }
    GetallRoles(PostData: GetRoleRequest): Observable<SimpleResponse> {
  
      return this.apiconnector.PostAPI("/SysMgr/GetAllRoles", PostData);
    }
}
