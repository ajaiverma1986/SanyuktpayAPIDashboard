import { Injectable } from '@angular/core';
import { BaseserviceService } from '../baseservice.service';
import { TxnListRequest, UserStatementRequest } from '../../RequestModel/ReportRequest';
import { Observable } from 'rxjs';
import { ListResponse } from '../../RequestModel/BaseResponse';

@Injectable({
  providedIn: 'root'
})
export class ReportmanService  {

  constructor(private apiconnector: BaseserviceService) { }

  PayoutTransactionReport(PostData: TxnListRequest): Observable<ListResponse> {

    return this.apiconnector.PostAPI("/Transaction/GetAllPayoutTransaction", PostData);
  }
  ListUserStatement(PostData: UserStatementRequest): Observable<ListResponse> {

    return this.apiconnector.PostAPI("/Transaction/GetUSerStatement", PostData);
  }

}
