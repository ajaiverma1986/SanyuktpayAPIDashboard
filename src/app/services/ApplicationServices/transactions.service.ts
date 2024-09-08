import { Injectable } from '@angular/core';
import { BaseserviceService } from '../baseservice.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimpleResponse } from '../../RequestModel/MasterDatarESPONSE';
import { AddPaymentRequestRequest, ApproveRejectOriAccountRequest, ApproveRejectPayinRequest, ListPayinRequestRequest, OriginatorListAccountforadminRequest, OriginatorListAccountRequest } from '../../RequestModel/TransactionRequest';
import { ListResponse } from '../../RequestModel/BaseResponse';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private apiconnector: BaseserviceService,private http: HttpClient) {
  }
  AddPayinRequest(PostData: AddPaymentRequestRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/Transaction/NewPayinRequest", PostData);
  }
  ListPaymentResponse(PostData: ListPayinRequestRequest): Observable<ListResponse> {

    return this.apiconnector.PostAPI("/Transaction/ListPayinRequest", PostData);
  }
  GetPayinRecieptFiles(RequestID:any): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/Transaction/DocumentViewPauinrequest_Search?RequestID="+RequestID);
  }
  ListPayinAccListResponse(PostData: OriginatorListAccountRequest): Observable<ListResponse> {

    return this.apiconnector.PostAPI("/User/ListallOriginatorsAccounts", PostData);
  }
  GetPayinAccChequeFiles(RequestID:any): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/User/GetOriginatorChequePhoto?AccountID="+RequestID);
  }
  ChangePayinRequestStatus(PostData: ApproveRejectPayinRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/Transaction/ChangePayinRequestStatus", PostData);
  }
  ListPayinAccListforAdminResponse(PostData: OriginatorListAccountforadminRequest): Observable<ListResponse> {

    return this.apiconnector.PostAPI("/User/ListAllOriginatorsAccountsforAdmin", PostData);
  }
  ApproveRejectPayinAccounts(PostData: ApproveRejectOriAccountRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/User/ApproveRejectOrigiAccounts", PostData);
  }
}
