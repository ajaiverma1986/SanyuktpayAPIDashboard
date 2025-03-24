import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../../../basecomponent/basecomponent.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FinoDMTService } from '../../../../../services/PaysprintServcies/fino-dmt.service';
import { FinoEkycRequestView } from '../../../../../RequestModel/SpayModel/FinoDMTRequest';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare function GetMorphoRDService(callback: (data: any) => void): void;
declare function GetMorphoRDDeviceInfo(callback: (data: any) => void): void;
declare function CaptureFingureMorpho(callback: (data: any) => void): void;

@Component({
  selector: 'app-fino-cust-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './fino-cust-register.component.html',
  styleUrl: './fino-cust-register.component.scss'
})
export class FinoCustRegisterComponent extends BasecomponentComponent implements OnInit {
  Usertoken!: string;
  CustModel: FinoEkycRequestView = new FinoEkycRequestView();
  frmfinCustReg!: FormGroup;
  strmsg!: string;
  respcode!: string;
  myData: any;
  isCaputure:boolean=false;
  rdservicestatus:number=0;
  devicereadystatus!:string;

  constructor(private routs: Router, private dmt: FinoDMTService, private fb: FormBuilder, toster: ToastrService) {
    super(toster)
  }
  ngOnInit(): void {

    this.createForm();
    this.ConnectDevice();

  }
  ConnectDevice() {
    GetMorphoRDService((data: any) => {
      this.myData = data;
      this.rdservicestatus=this.myData.rdservicestatus;
      this.devicereadystatus=this.myData.readyStatus;
    });
  }

  GetDeviceInfo() {
    GetMorphoRDDeviceInfo((data: any) => {
      this.myData = data;
    });
  }
  FingerCapure() {
    CaptureFingureMorpho((data: any) => {
      this.myData = data;
      this.isCaputure=true;
      
    });
  }
  createForm() {
    this.frmfinCustReg = this.fb.group({
      Mobile: ['', [Validators.required]],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      AadharNo: ['', [Validators.required, Validators.minLength(12)]],
    });
  }
  RegisterCustomerWithKYC() {
    
      this.CustModel.PidData=this.myData.pidata;
      this.CustModel.Mobile = this.frmfinCustReg.get("Mobile")?.value;
      this.CustModel.AadharNo = this.frmfinCustReg.get("AadharNo")?.value;
      this.CustModel.FirstName = this.frmfinCustReg.get("FirstName")?.value;
      this.CustModel.LastName = this.frmfinCustReg.get("LastName")?.value;
      this.CustModel.AccessMode = "WEB";
      this.CustModel.isIris = 2;
      this.CustModel.TokenData = sessionStorage.getItem("PaySPTOKEN") || '';
    

    this.dmt.RegisterFinoCustomerKyc(this.CustModel).subscribe({
      next: (result) => {

        this.strmsg = result.message || '';
        this.respcode = result.response_code || '';
        if (result.response_code == "1") {
          this.showToaster(1, this.strmsg, "DMT")
        }
        else {
          this.showToaster(3, this.strmsg, "DMT")
        }
      }
    });
   
  }
  getInvalidControls() {
    const invalidControls = [];
    const controls = this.frmfinCustReg.controls;
    for (const name in controls) {
      if (controls[name].invalid && controls[name].touched) {
        invalidControls.push(name);
      }
    }
    return invalidControls;
  }
  onSubmit() {
    if (this.rdservicestatus == 1) {
      if (this.devicereadystatus != "NOTREADY") {
        if(this.isCaputure==true)
        {
          this.RegisterCustomerWithKYC();
        }
       else
       {
        this.showToaster(2, "Fingerprint not capture", "DMT");
       }
      }
      else {
        this.showToaster(2, "Device Not Connected", "DMT");
      }
    }
    else {
      this.showToaster(2, "RD Service not found", "DMT");
    }

  }
}
