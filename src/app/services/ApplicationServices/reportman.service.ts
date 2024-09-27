import { Injectable } from '@angular/core';
import { BaseserviceService } from '../baseservice.service';
import { GetDayBookRequest, TxnListRequest, UserStatementRequest } from '../../RequestModel/ReportRequest';
import { Observable } from 'rxjs';
import { ListResponse } from '../../RequestModel/BaseResponse';
import { SimpleResponse } from '../../RequestModel/MasterDatarESPONSE';

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
  GetTransactionSummaryByUserId(Userid:number): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/Report/GetTransactionSummaryByUserId?UserID="+Userid);
  }
  GetDayBookByUserId(PostData: GetDayBookRequest): Observable<SimpleResponse> {

    return this.apiconnector.PostAPI("/Transaction/GetDayBookByUserId", PostData);
  }
  GetallFirmDetail(Userid:number): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/Report/GetallFirmDetail?UserID="+Userid);
  }

}
