import { CommonModule, LowerCasePipe } from '@angular/common';
import { Component, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { LoginServiceService } from '../../../services/common/login-service.service';
import { RegisterUserRequest } from '../../../RequestModel/LoginRequest';
import { SimpleResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { HeaderComponent } from "../header/header.component";
import { NavHeaderComponent } from "../nav-header/nav-header.component";
import { FooterComponent } from "../footer/footer.component";


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent, HeaderComponent, NavHeaderComponent, FooterComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent extends BasecomponentComponent implements OnInit {
  frmRegistration!: FormGroup
  ModelReq: RegisterUserRequest = new RegisterUserRequest();
  UserMasterId!: string;
  errors: any;


  constructor(private fb: FormBuilder, private logservice: LoginServiceService, toast: ToastrService) {
    super(toast);
    this.createForm();
  }

  ngOnInit(): void {

  }
  ClearData() {
    this.frmRegistration.reset(this.frmRegistration.value);
  }
  createForm() {
    this.frmRegistration = this.fb.group({
      Email: ['', Validators.required],
      Mobile: ['', Validators.required],
      OrgName: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Passwor: ['', Validators.required],
      ConfirmPass: ['', Validators.required]

    });
  }

  onRegistreSubmit() {

    this.ModelReq.EmailId = this.frmRegistration.get("Email")?.value;
    this.ModelReq.FirstName = this.frmRegistration.get("FirstName")?.value;
    this.ModelReq.MobileNo = this.frmRegistration.get("Mobile")?.value;
    this.ModelReq.LastName = this.frmRegistration.get("LastName")?.value;
    this.ModelReq.FirstName = this.frmRegistration.get("FirstName")?.value;
    this.ModelReq.Password = this.frmRegistration.get("Passwor")?.value;
    this.ModelReq.OrganisationName = this.frmRegistration.get("OrgName")?.value;
   

    this.logservice.RegisterUser(this.ModelReq).subscribe({
      next: (data) => {
        if (data.HasError) {
          this.errors = data.Errors;
          alert(this.errors[0].ErrorMessage);
        } else {
          this.ClearData();
          this.showToaster(1, "Successfully Registred kindly check your mail to Activate your Account", "Partner Registration")
        }
      }
    })
  }

}
