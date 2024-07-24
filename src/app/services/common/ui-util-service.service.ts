import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiUtilServiceService {

  constructor() { }
  
  scrolltoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getString(value: string | null): string {
    if(value != null) {
      return value; 
    }
    return "";
  }
}
