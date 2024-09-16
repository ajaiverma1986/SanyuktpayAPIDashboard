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
  selector: 'app-user-address',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-address.component.html',
  styleUrl: './user-address.component.scss'
})
export class UserAddressComponent extends BasecomponentComponent implements OnInit {
  listdata: any;
  selectedValue!: string;
  frmUserAddress!: FormGroup;
  UserId!: number;
  Modeldata!:AddressTypeListResponse[]
  Model:CreateUserDetailAddressRequest=new CreateUserDetailAddressRequest();
  ModelDataPin!:PincodeDataResponse[];
  
  
  constructor(private mstdataservice: MasterDataService,private routs:Router, private frmBuilder: FormBuilder, private users: UserMasterService,toster:ToastrService) {
    super(toster)
    this.createForm();
  }
  ngOnInit(): void {

    this.selectedValue="0";
    this.mstdataservice.AdressTypeList().subscribe({
      next: (SimpleResponse) => {
       this.Modeldata = SimpleResponse.Result;
      }
    });
  }

  createForm() {
    this.frmUserAddress = this.frmBuilder.group({
      AddressTypeId: ['', Validators.required],
      PincodeDataId: ['', Validators.required],
      Address1: ['', Validators.required],
      Address2: ['', Validators.required],
      Address3: ['', [Validators.required,Validators.email]],
      Pincode: ['', Validators.required],
     
    });
  }
  OnChanges()
  { let pincode :string;
    pincode=this.frmUserAddress.get("Pincode")?.value
    this.mstdataservice.DemographicDataListByPincode(pincode).subscribe({
      next: (SimpleResponse) => {
       this.ModelDataPin = SimpleResponse.Result;
      }
    });
  }
  OnsubmitUserAddress(): void {

    
    this.Model.AddressTypeId = Number(this.frmUserAddress.get("AddressTypeId")?.value);
    this.Model.PincodeDataId =Number( this.frmUserAddress.get("PincodeDataId")?.value);
    this.Model.Address1 = this.frmUserAddress.get("Address1")?.value;
    this.Model.Address2 = this.frmUserAddress.get("Address2")?.value;
    this.Model.Address3 = this.frmUserAddress.get("Address3")?.value;
    this.Model.Pincode = this.frmUserAddress.get("Pincode")?.value;
    this.Model.userId = 0;

    this.users.AddUserAddress(this.Model).subscribe({
      next: (SimpleResponse) => {
        this.UserId = Number(SimpleResponse.Result);
        if (this.UserId > 0) {
          this.showToaster(1,"Record Saved Successfully","Partner Onboarding");
          this.frmUserAddress.reset();
        }
        else
        {
          console.log(SimpleResponse);
          this.showToaster(3,"Record Not Saveed Successfully","Partner Onboarding");
        }

      }
    });
  }
  BacktoPre(){
    this.routs.navigate(['/Dashboard/usraddlist']);
  }
}
