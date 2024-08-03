import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CompanyTypeMasterResponse, PlanMasterListResponse, SimpleResponse } from '../RequestModel/MasterDatarESPONSE';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
apiurl=environment.baseurl;

  constructor(private http:HttpClient) { }

  getDefaultHeader():HttpHeaders
  {
    let userToken=sessionStorage.getItem("UserToken");
    let headers=new HttpHeaders();
    headers = headers.set("Access-Control-Allow-Origin", "*");
    headers = headers.set("content-type", "application/json");
    headers = headers.set("APIToken", environment.APIToken);
    headers = headers.set("usertoken", userToken? '': '');
    return headers;
  }
  GetallPlan(): Observable<SimpleResponse> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.get<SimpleResponse>(this.apiurl + "/MasterData/ListPlanMaster",  {headers: headers});
  }
  GetAllCompanyTypeMaster(): Observable<SimpleResponse> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.get<SimpleResponse>(this.apiurl + "/MasterData/GetAllCompanyTypeMaster",  {headers: headers});
  }
  GenderList(): Observable<SimpleResponse> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.get<SimpleResponse>(this.apiurl + "/MasterData/GenderList",  {headers: headers});
  }
  MaritalStatusList(): Observable<SimpleResponse> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.get<SimpleResponse>(this.apiurl + "/MasterData/MaritalStatusList",  {headers: headers});
  }
  AdressTypeList(): Observable<SimpleResponse> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.get<SimpleResponse>(this.apiurl + "/MasterData/AdressTypeList",  {headers: headers});
  }
  AgencyList(): Observable<SimpleResponse> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.get<SimpleResponse>(this.apiurl + "/MasterData/AgencyList",  {headers: headers});
  }
  BankList(): Observable<SimpleResponse> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.get<SimpleResponse>(this.apiurl + "/MasterData/BankList",  {headers: headers});
  }
  StateList(): Observable<SimpleResponse> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.get<SimpleResponse>(this.apiurl + "/MasterData/StateList",  {headers: headers});
  }
  DistrictList(StateId:string): Observable<SimpleResponse> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.get<SimpleResponse>(this.apiurl + "/MasterData/DistrictList?StateId="+StateId,  {headers: headers});
  }
  KycTypeList(CompanyTypeId:string,UserTypeID :string): Observable<SimpleResponse> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.get<SimpleResponse>(this.apiurl + "/MasterData/KycTypeList?CompanyTypeId="+CompanyTypeId+"&UserTypeID="+UserTypeID,  {headers: headers});
  }
  UserTypeList(): Observable<SimpleResponse> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.get<SimpleResponse>(this.apiurl + "/MasterData/UserTypeList",  {headers: headers});
  }
  DemographicDataListByPincode(Pincode:string): Observable<SimpleResponse> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.get<SimpleResponse>(this.apiurl + "/MasterData/DemographicDataListByPincode?Pincode="+Pincode,  {headers: headers});
  }
  ListLedegrType(): Observable<SimpleResponse> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.get<SimpleResponse>(this.apiurl + "/MasterData/ListLedegrType",  {headers: headers});
  }
  ListServiceType(AgencyId:string): Observable<SimpleResponse> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.get<SimpleResponse>(this.apiurl + "/MasterData/ListServiceType?AgencyId="+AgencyId,  {headers: headers});
  }
  ListPaymentChanel(): Observable<SimpleResponse> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.get<SimpleResponse>(this.apiurl + "/MasterData/ListPaymentChanel",  {headers: headers});
  }
  ListPaymentModes(PaymentChanelId:string): Observable<SimpleResponse> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.get<SimpleResponse>(this.apiurl + "/MasterData/ListPaymentModes?PaymentChanelId="+PaymentChanelId,  {headers: headers});
  }
}
