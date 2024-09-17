import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { MasterDataService } from '../../../services/master-data.service';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import { AddressTypeListResponse, PincodeDataResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { ChangePasswordRequest } from '../../../RequestModel/UserRequest';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent extends BasecomponentComponent implements OnInit {

  UserName!:string;
  frmUserAddress!: FormGroup;
  UserId!: number;
  Modeldata!:AddressTypeListResponse[]
  Model:ChangePasswordRequest=new ChangePasswordRequest();
  UserTypeId!:string;
 
  
  constructor(private mstdataservice: MasterDataService,private routs:Router, private frmBuilder: FormBuilder, private users: UserMasterService,toster:ToastrService) {
    super(toster)
    this.createForm();
  }
  ngOnInit(): void {
this.UserName=sessionStorage.getItem("Uname") || '';
this.UserTypeId=sessionStorage.getItem("uttt") || '';

this.frmUserAddress.patchValue({
  Username:this.UserName
});
  }

  createForm() {
    this.frmUserAddress = this.frmBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      Confirmpass: ['', Validators.required],
    });
  }
  
  Onsubmit(): void {
    this.Model.Password = this.frmUserAddress.get("Password")?.value;
    this.Model.UserName = this.frmUserAddress.get("Username")?.value;
   
    this.users.ChangePassword(this.Model).subscribe({
      next: (SimpleResponse) => {
        this.UserId = Number(SimpleResponse.Result.Result);
        console.log(this.UserId);
        if (this.UserId > 0) {
          this.showToaster(1,"Password has been changed Successfully","Change Password");
          this.frmUserAddress.reset();
        }
        else
        {
         
          this.showToaster(3,"Please try again","Change Password");
        }

      }
    });
  }
  BacktoPre(){
    if( Number(this.UserTypeId)==3)
    {
      this.routs.navigate(['/Dashboard/ParProfile']);
    }
    else
    {
      this.routs.navigate(['/Dashboard/UserProfile']);
    }

  }
}
