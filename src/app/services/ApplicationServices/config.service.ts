import { Injectable } from '@angular/core';
import { BaseserviceService } from '../baseservice.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimpleResponse } from '../../RequestModel/MasterDatarESPONSE';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private apiconnector: BaseserviceService,private http: HttpClient) {
  }
  ListUserAccounts(): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/Config/ListPaymentAccounts");
  }
  ListCalculationType(): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/Config/ListCalCulationType");
  }
  ListChargeDeductionType(): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/Config/ListChargeDedcutionType");
  }
}
