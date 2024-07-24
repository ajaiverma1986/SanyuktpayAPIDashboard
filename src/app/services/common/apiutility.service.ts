import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';
import { UiUtilServiceService } from './ui-util-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiutilityService {

  constructor(private router:Router,private utils:UiUtilServiceService) { }

  getDefaultHeader():HttpHeaders
  {
    let headers=new HttpHeaders();
    headers = headers.set("Access-Control-Allow-Origin", "*");
    headers = headers.set("content-type", "application/json");
    headers = headers.set("APIToken", "48550088-F090-495D-9F28-597E5FE22D6A");
    return headers;
  }
  isObjectEmpty(obj: any): boolean {
    let isObjectEmpty: boolean = false;
    if (Object.keys(obj).length === 0) {
      isObjectEmpty = true
    }
    return isObjectEmpty;
  }

  getStringValueOf(value: string | null): string {
    return value = value==null?'': value;
  }
  
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
