import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Router, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';


//before login check
@Injectable({
  providedIn: 'root'
})
export class AuthGaurdLoginService implements CanActivate {

  constructor(private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isloginvalid=sessionStorage.getItem("isloginvalid");
    if(isloginvalid=="1")
    {
      this.router.navigate(["/Dashboard"])
      return false;
    }
    else
    {
      return true;
    }
  }
}

//After login check
@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isloginvalid=sessionStorage.getItem("isloginvalid");
    if(isloginvalid=="1")
    {
      
      return true;
    }
    else
    {
      this.router.navigate(["/login"])
      return false;
    }
  }
}
