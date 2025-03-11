import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgOtpInputComponent,MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  isOtp: number = 0;
  frmregister1!: FormGroup;
  frmrverifyotp!: FormGroup;
  FrmUserType!:FormGroup;
  frmPanDetails!:FormGroup;
  frmAadharDetails!:FormGroup;
  frmEmailVerification!:FormGroup;
  selectedvalue!:string;
  pic!:string;
  pic1!:string;
  pic2!:string;
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
  CreateOUserAadharDetailform() {
    this.frmAadharDetails = this.fb.group({
      AadharNo: [''],
      aName: [''],
      adob: [''],
      aGenderID: [''],
      aAddresss: [''],
    });
  }
  CreateOUserEmailDetailform() {
    this.frmEmailVerification = this.fb.group({
      VEmailID: [''],
    
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
    this.CreateOUserAadharDetailform();
  }
  setDefaultPic(){
    this.pic = "assets/graybackblank.jpg";
    this.pic1 = "assets/graybackblank.jpg";
    this.pic2 = "assets/graybackblank.jpg";
  }
  onFileChange(event:any){

  }
  onFileChangeaFront(event:any){
    
  }
  onFileChangeaBack(event:any){

  }
  SubmitAadharDetail(){
    this.isOtp=5;

  }
  SubmitEmailDetail(){
this.isOtp=5;
  }

}
