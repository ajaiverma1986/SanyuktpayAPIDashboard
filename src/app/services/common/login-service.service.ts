import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiutilityService } from './apiutility.service';
import { LoginRequest } from '../../RequestModel/LoginRequest';
import { ModelRequest } from '../../RequestModel/ModelRequest';
import { Authorization } from '../../RequestModel/Authorization';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
apiUrl=environment.baseurl;
  constructor(private http:HttpClient) { 

  }
  getDefaultHeader():HttpHeaders
  {
    let headers=new HttpHeaders();
    headers = headers.set("Access-Control-Allow-Origin", "*");
    headers = headers.set("content-type", "application/json");
    headers = headers.set("APIToken", "48550088-F090-495D-9F28-597E5FE22D6A");
    return headers;
  }
  login(Usercode: string, Password: string): Observable<Authorization> {
    let loginreq: LoginRequest = new LoginRequest();
    loginreq.Username = Usercode;
    loginreq.Password = Password;
    let headers: HttpHeaders = this.getDefaultHeader();
    return this.http.post<Authorization>(this.apiUrl + "/AA/login", loginreq,  {headers: headers});
  }
}