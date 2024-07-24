import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';
import { LoginServiceService } from '../../../services/common/login-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'

})
export class LoginComponent {


  constructor(private fb:FormBuilder,private loginService:LoginServiceService,private router:Router)
  {
this.createForm();
  }
  
  loginForm!:FormGroup;
  ngOnInit():void
  {
    // localStorage.clear();
  }
  createForm()
  {
    this.loginForm=this.fb.group({
      Usercode:['',Validators.required],
      password:['',Validators.required]
   } );
  }
  

  onSubmit()
  {
    console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.get("Usercode")?.value,this.loginForm.get('password')?.value).subscribe({
      next: (authorization) => {
        if(authorization.HasError) {
          sessionStorage.setItem("isloginvalid","0")
         alert("Incorrect username or password");
        } else {
        sessionStorage.setItem("isloginvalid","1")
          sessionStorage.setItem("Display Name", authorization.DisplayName);
          sessionStorage.setItem("UserToken", authorization.UserToken);
          sessionStorage.setItem("Has error", authorization.HasError);
         this.router.navigate(['/Dashboard']);
        }
      },
      error: (error) => {
        if(error.status == "401"){
          console.log("Authentication Failed");
        }
      }
    });;
  }

}
