import { Injectable } from '@angular/core';
import { BaseserviceService } from '../baseservice.service';
import { SimpleResponse } from '../../RequestModel/MasterDataResponse';
import { Observable } from 'rxjs';
import { FinoDeleteBenRequestView, FinoEkycRequestView, FinofetchBenRequestView, FinoRefundOtpRequestView, FinoRefundRequestView, FinoRegBenRequestView, FinoRegCustomerRequestView, FinoTransactionFinalRequestView, FinoTransactionRequestView, FinoTransactionSendRequestView, FinoTransactionStatusRequestView, GetCustomerRequestView } from '../../RequestModel/SpayModel/FinoDMTRequest';
import { SpBaseResponse } from '../../ResponseModel/SpayResponseModel/FinoDMTResponse';

@Injectable({
  providedIn: 'root'
})
export class FinoDMTService {

  constructor(private apiconnector: BaseserviceService) { }

  GenerateSPAYToken(): Observable<SimpleResponse> {

    return this.apiconnector.GetAPI("/PaySPMT/GenerateToken");
  }
  GetCustomerDetail(PostData: GetCustomerRequestView): Observable<SpBaseResponse> {

    return this.apiconnector.PostAPI("/PaySPMT/GetFinoCustomerDetail", PostData);
  }
  RegisterFinoCustomerKyc(PostData: FinoEkycRequestView): Observable<SpBaseResponse> {

    return this.apiconnector.PostAPI("/PaySPMT/RegisterFinoCustomerKyc", PostData);
  }
  RegisterFinoCustomer(PostData: FinoRegCustomerRequestView): Observable<SpBaseResponse> {

    return this.apiconnector.PostAPI("/PaySPMT/RegisterFinoCustomer", PostData);
  }
  FinoRegisterBenficiary(PostData: FinoRegBenRequestView): Observable<SpBaseResponse> {

    return this.apiconnector.PostAPI("/PaySPMT/FinoRegisterBenficiary", PostData);
  }
  FinoDeleteBenficiary(PostData: FinoDeleteBenRequestView): Observable<SpBaseResponse> {

    return this.apiconnector.PostAPI("/PaySPMT/FinoDeleteBenficiary", PostData);
  }
  FinoFetchBenficiary(PostData: FinofetchBenRequestView): Observable<SpBaseResponse> {

    return this.apiconnector.PostAPI("/PaySPMT/FinoFetchBenficiary", PostData);
  }
  FinoFetchBenficiaryByBenID(PostData: FinofetchBenRequestView): Observable<SpBaseResponse> {

    return this.apiconnector.PostAPI("/PaySPMT/FinoFetchBenficiaryByBenID", PostData);
  }
  FinoPPenyDrop(PostData: FinoTransactionRequestView): Observable<SpBaseResponse> {

    return this.apiconnector.PostAPI("/PaySPMT/FinoPPenyDrop", PostData);
  }
  FinoTransactionOTP(PostData: FinoTransactionSendRequestView): Observable<SpBaseResponse> {

    return this.apiconnector.PostAPI("/PaySPMT/FinoTransactionOTP", PostData);
  }
  FinoTransaction(PostData: FinoTransactionFinalRequestView): Observable<SpBaseResponse> {

    return this.apiconnector.PostAPI("/PaySPMT/FinoTransaction", PostData);
  }
  FinoTransactionStatus(PostData: FinoTransactionStatusRequestView): Observable<SpBaseResponse> {

    return this.apiconnector.PostAPI("/PaySPMT/FinoTransactionStatus", PostData);
  }
  FinoTransactionRefundOTP(PostData: FinoRefundOtpRequestView): Observable<SpBaseResponse> {

    return this.apiconnector.PostAPI("/PaySPMT/FinoTransactionRefundOTP", PostData);
  }
  FinoTransactionRefund(PostData: FinoRefundRequestView): Observable<SpBaseResponse> {

    return this.apiconnector.PostAPI("/PaySPMT/FinoTransactionRefund", PostData);
  }
}
