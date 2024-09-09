import { Injectable } from '@angular/core';
import { BaseserviceService } from '../baseservice.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimpleResponse } from '../../RequestModel/MasterDatarESPONSE';
import { AddPaymentAccountMasterRequest, AddTxnslabRequest, ChangePaymentAccStatusRequest, CommissionDistributionRequest, TopupChargeRequest, TransactionslabRequest } from '../../RequestModel/ConfigRequest';

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
  ListPlan(PlanId?:number): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/Config/ListPlanMaster");
  }
  ListSlabType(): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/Config/GetallSlabType");
  }
  ListCommissionDistribution(postData:CommissionDistributionRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/Config/ListCommissionDistribution",postData);
  }
  ListTopupCharge(postData:TopupChargeRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/Config/ListTopupCharge",postData);
  }
  ListTransactionslab(postData:TransactionslabRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/Config/ListTransactionSlab",postData);
  }
  AddCompanyPaymentAccount(postData:AddPaymentAccountMasterRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/Config/AddPaymentAccounts",postData);
  }
  ChangeAccPaymentStatus(postData:ChangePaymentAccStatusRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/Config/changesPaymentAccountsStatus",postData);
  }
  AddNewTransactionSlab(postData:AddTxnslabRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/Config/AddTransacttionSlab",postData);
  }
}
