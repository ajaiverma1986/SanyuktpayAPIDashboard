import { CommonModule } from '@angular/common';
import { Component, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { LoginServiceService } from '../../../services/common/login-service.service';
import { RegisterUserRequest } from '../../../RequestModel/LoginRequest';
import { SimpleResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent extends BasecomponentComponent implements OnInit {
  frmRegistration!: FormGroup
  ModelReq:RegisterUserRequest=new RegisterUserRequest();
  UserMasterId!:string;
  errors:any;

  constructor(private fb: FormBuilder,private logservice:LoginServiceService,toast:ToastrService) {
    super(toast);
    this.createForm();
  }
  ngOnInit(): void {

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

  onRegistreSubmit(){

    this.logservice.RegisterUser(this.ModelReq).subscribe({
      next:(data)=>{
        if (data.HasError) {
          this.errors=data.Errors;
          alert(this.errors[0].ErrorMessage);
        } else {

          this.showToaster(1,"Successfully Registred kindly check your mail to Activate your Account","Partner Registration")
        }
      }
    })
  }

}
