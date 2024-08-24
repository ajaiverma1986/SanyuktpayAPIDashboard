import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LoginServiceService } from '../../../services/common/login-service.service';
import { NavHeaderComponent } from "../nav-header/nav-header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, NavHeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'

})
export class LoginComponent {

errors:any;
  constructor(private fb: FormBuilder, private loginService: LoginServiceService, private router: Router) {
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
    
    this.loginService.login(this.loginForm.get("Usercode")?.value, this.loginForm.get('password')?.value).subscribe({
      next: (authorization) => {
        if (authorization.HasError) {
          sessionStorage.setItem("isloginvalid", "0")
          this.errors=authorization.Errors;
          alert(this.errors[0].ErrorMessage);
        } else {

          sessionStorage.setItem("isloginvalid", "1")
          sessionStorage.setItem("Display Name", authorization.DisplayName);
          sessionStorage.setItem("UserToken", authorization.UserToken);
          sessionStorage.setItem("Has error", authorization.HasError);
          this.router.navigate(['/Dashboard']);
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
