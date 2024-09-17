import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { MasterDataService } from '../../../services/master-data.service';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import { AddressTypeListResponse, PincodeDataResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { CreateUserDetailAddressRequest } from '../../../RequestModel/UserRequest';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ipmanager',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './ipmanager.component.html',
  styleUrl: './ipmanager.component.scss'
})
export class IPManagerComponent extends BasecomponentComponent implements OnInit {
  frmIPmgr!: FormGroup;
  UserId!: number;
  Modeldata!:AddressTypeListResponse[]
  Model:CreateUserDetailAddressRequest=new CreateUserDetailAddressRequest();
  ModelDataPin!:PincodeDataResponse[];
  
  constructor(private mstdataservice: MasterDataService,private routs:Router, private frmBuilder: FormBuilder, private users: UserMasterService,toster:ToastrService) {
    super(toster)
    this.createForm();
  }
  ngOnInit(): void {

  }

  createForm() {
    this.frmIPmgr = this.frmBuilder.group({
      IPAddress: ['', Validators.required],
     
    });
  }
  
  OnsubmitUserAddress(): void {

    
    this.Model.AddressTypeId = Number(this.frmIPmgr.get("IPAddress")?.value);

    this.users.AddUserAddress(this.Model).subscribe({
      next: (SimpleResponse) => {
        this.UserId = Number(SimpleResponse.Result);
        if (this.UserId > 0) {
          this.showToaster(1,"Record Saved Successfully","Partner Onboarding");
          this.frmIPmgr.reset();
        }
        else
        {
          this.showToaster(3,"Record Not Saveed Successfully","Partner Onboarding");
        }

      }
    });
  }
  BacktoPre(){
    this.routs.navigate(['/Dashboard/usraddlist']);
  }
}
