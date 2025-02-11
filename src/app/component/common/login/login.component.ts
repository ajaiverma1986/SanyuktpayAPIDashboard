import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LoginServiceService } from '../../../services/common/login-service.service';
import { NavHeaderComponent } from "../nav-header/nav-header.component";
import { FooterComponent } from "../footer/footer.component";
import { ListUserMasterResponse } from '../../../ResponseModel/UserResponse';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerService, NgxSpinnerModule } from "ngx-spinner";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgxSpinnerModule, RouterModule, CommonModule, NavHeaderComponent, FooterComponent, MatSliderModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'

})
export class LoginComponent {

  Model: ListUserMasterResponse = new ListUserMasterResponse();

  errors: any;
  constructor(private fb: FormBuilder, private loginService: LoginServiceService, private router: Router, private spinner: NgxSpinnerService) {
    this.createForm();
  }

  loginForm!: FormGroup;
  ngOnInit(): void {

    sessionStorage.clear();
  }
  createForm() {
    this.loginForm = this.fb.group({
      Usercode: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    this.spinner.show();

    this.loginService.login(this.loginForm.get("Usercode")?.value, this.loginForm.get('password')?.value).subscribe({
      next: (authorization) => {
        if (authorization.HasError) {
          sessionStorage.setItem("isloginvalid", "0")
          this.errors = authorization.Errors;
          alert(this.errors[0].ErrorMessage);
        } else {


          sessionStorage.setItem("isloginvalid", "1")
          sessionStorage.setItem("Display Name", authorization.DisplayName);
          sessionStorage.setItem("UserToken", authorization.UserToken);
          sessionStorage.setItem("Has error", authorization.HasError);
          sessionStorage.setItem("Uname", this.loginForm.get("Usercode")?.value);

          this.loginService.GetUserDetails(this.loginForm.get("Usercode")?.value).subscribe({
            next: (data) => {
              this.Model = data.Result;
              sessionStorage.setItem("uttt", this.Model.UserTypeId.toString());

              if (this.Model.UserTypeId == 3) {
                this.router.navigate(['/Dashboard/ParProfile']);
              }
              else {
                this.router.navigate(['/Dashboard/UserProfile']);
              }
              this.spinner.hide();
            }
          });



        }
      },
      error: (error) => {
        if (error.status == "401") {
          console.log("Authentication Failed");
          alert("Authentication Failed");
        }
      }
    });;
  }

}
