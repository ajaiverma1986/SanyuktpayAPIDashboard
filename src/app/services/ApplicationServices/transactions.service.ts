import { Injectable } from '@angular/core';
import { BaseserviceService } from '../baseservice.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimpleResponse } from '../../RequestModel/MasterDatarESPONSE';
import { AddPaymentRequestRequest } from '../../RequestModel/TransactionRequest';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private apiconnector: BaseserviceService,private http: HttpClient) {
  }
  AddPayinRequest(PostData: AddPaymentRequestRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/Transaction/NewPayinRequest", PostData);
  }
  
}
