import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../../../basecomponent/basecomponent.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FinoDMTService } from '../../../../../services/PaysprintServcies/fino-dmt.service';
import { FinoEkycRequestView, FinoRegCustomerRequestView } from '../../../../../RequestModel/SpayModel/FinoDMTRequest';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgOtpInputComponent } from 'ng-otp-input';
import { FinoCustomerEkycResponse, FinoCustomerLimitResponse } from '../../../../../ResponseModel/SpayResponseModel/FinoDMTResponse';

declare function GetMorphoRDService(callback: (data: any) => void): void;
declare function GetMorphoRDDeviceInfo(callback: (data: any) => void): void;
declare function CaptureFingureMorpho(callback: (data: any) => void): void;

@Component({
  selector: 'app-fino-cust-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgOtpInputComponent],
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
  isCaputure: boolean = false;
  rdservicestatus: number = 0;
  devicereadystatus!: string;
  processid!: number;
  frmfinoveriotp!: FormGroup;
  custModelO: FinoRegCustomerRequestView = new FinoRegCustomerRequestView();
  RespKYCModel: FinoCustomerEkycResponse = new FinoCustomerEkycResponse();
  RespRegModel: FinoCustomerLimitResponse = new FinoCustomerLimitResponse();

  constructor(private routs: Router, private dmt: FinoDMTService, private fb: FormBuilder, toster: ToastrService) {
    super(toster)
  }
  ngOnInit(): void {
    this.processid = 1;
    this.createForm();
    this.ConnectDevice();

  }
  ConnectDevice() {
    GetMorphoRDService((data: any) => {
      this.myData = data;
      this.rdservicestatus = this.myData.rdservicestatus;
      this.devicereadystatus = this.myData.readyStatus;
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
      this.isCaputure = true;

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

    this.CustModel.PidData = this.myData.pidata;
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
        this.RespKYCModel = result.data;

        if (result.response_code == "1") {
          this.custModelO.TokenData = this.CustModel.TokenData;
          this.custModelO.ekyc_id = this.RespKYCModel.ekyc_id;
          this.custModelO.mobile = this.CustModel.Mobile;
          this.custModelO.stateresp = this.RespKYCModel.stateresp;
          console.log(this.custModelO);

          this.processid = 2;
          this.CreateOtpForm();

          this.showToaster(1, this.strmsg, "DMT")
        }
        else {
          this.processid = 1;
          this.showToaster(3, this.strmsg, "DMT")
        }
      }
    });

  }
  CreateOtpForm() {
    this.frmfinoveriotp = this.fb.group({
      ngOtpInput: [''],
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
  getInvalidControls1() {
    const invalidControls1 = [];
    const controls = this.frmfinoveriotp.controls;
    for (const name in controls) {
      if (controls[name].invalid && controls[name].touched) {
        invalidControls1.push(name);
      }
    }
    return invalidControls1;
  }
  onSubmit() {
    if (this.rdservicestatus == 1) {
      if (this.devicereadystatus != "NOTREADY") {
        if (this.isCaputure == true) {
          this.RegisterCustomerWithKYC();
        }
        else {
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
  OnSubmitOTP() {
    this.custModelO.otp = this.frmfinoveriotp.get("ngOtpInput")?.value;
    this.dmt.RegisterFinoCustomer(this.custModelO).subscribe({
      next: (result) => {
        this.strmsg = result.message || '';
        this.respcode = result.response_code || '';
        this.RespRegModel = result.data;
        if (this.respcode == "1") {
          this.showToaster(1, this.strmsg, "DMT")
          this.routs.navigate(['/Dashboard/FinDMT']);
        }
        else {
          this.showToaster(3, this.strmsg, "DMT")
        }
      }
    });
  }
}
