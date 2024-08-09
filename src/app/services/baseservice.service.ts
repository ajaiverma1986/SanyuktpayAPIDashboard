import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimpleResponse } from '../RequestModel/MasterDatarESPONSE';

@Injectable({
  providedIn: 'root'
})
export class BaseserviceService {

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
    console.log("Token:-",userToken);
    return headers;
  }
  getDefaultHeaderFiles():HttpHeaders
  {
    let userToken=sessionStorage.getItem("UserToken");
    let headers=new HttpHeaders();
    headers = headers.set("Access-Control-Allow-Origin", "*");
    headers = headers.set("content-type", "multipart/form-data");
    headers = headers.set("APIToken", environment.APIToken);
    headers = headers.set("usertoken", userToken? '': '');
    return headers;
  }


  GetAPI(Url:string): Observable<any> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.get<SimpleResponse>(this.apiurl + Url,  {headers: headers});
  }
  PostAPI(Url:string,PostData:any): Observable<any> {
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.post<SimpleResponse>(this.apiurl+Url,PostData,{headers: headers})
  }
  PostFileAPI(Url:string,PostData:any): Observable<any> {
    let headers: HttpHeaders = this.getDefaultHeaderFiles();
    return this.http.post<SimpleResponse>(this.apiurl+Url,PostData,{headers: headers})
  }
}
