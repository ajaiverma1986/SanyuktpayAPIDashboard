import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgOtpInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  isOtp: number = 0;
  frmregister1!: FormGroup;
  frmrverifyotp!: FormGroup;
  FrmUserType!:FormGroup;
  frmPanDetails!:FormGroup;
  selectedvalue!:string;
  pic!:string;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  ngOnInit(): void {

    sessionStorage.clear();
  }
  createForm() {
    this.frmregister1 = this.fb.group({
      MobileNo: ['', Validators.required, Validators.minLength(10), Validators.maxLength(10)],

    });
  }
  CreateOtpForm() {
    this.frmrverifyotp = this.fb.group({
      ngOtpInput: [''],
    });
  }
  CreateOUserTypeform() {
    this.FrmUserType = this.fb.group({
      GenderId: [''],
    });
  }
  CreateOUserPanDetailform() {
    this.frmPanDetails = this.fb.group({
      PanNo: [''],
      Name: [''],
      dob: [''],
      GenderID: [''],
      Email: [''],
      Addresss: [''],
    });
  }
  onSubmitMobile() {
    this.isOtp = 1;
    this.CreateOtpForm();
  }
  onOtpChange(event: any) {

  }
  onVerifyOTP() {
this.isOtp=2;
this.CreateOUserTypeform();
  }
  SubmitUserType(){
    this.isOtp=3;
    this.CreateOUserPanDetailform();
    this.setDefaultPic();
  }
  SubmitPanDetail(){
    this.isOtp=4;
  }
  setDefaultPic(){
    this.pic = "assets/images/card/1.png";
  }

}
