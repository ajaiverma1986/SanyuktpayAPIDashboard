import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import {MatButtonModule} from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MasterDataService } from '../../../services/master-data.service';
import { ClassListResponse } from '../../../RequestModel/MasterDataResponse';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgOtpInputComponent,MatButtonModule,NgbModule],
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
  selectedDate: any;
  classlst!:ClassListResponse[];
  selectedvalueMode:number=0;
  constructor(private fb: FormBuilder,private mds:MasterDataService) {
    this.createForm();
  }
  ngOnInit(): void {
    const now = new Date();

    this.selectedDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    sessionStorage.clear();

    this.mds.ClassMasterList().subscribe({
      next: (data) => {
        this.classlst = data.Result;
       
      }
    });
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
 
  CreateOUserPanDetailform() {
    this.frmPanDetails = this.fb.group({
      FristName: [''],
      LastName: [''],
      dob: [''],
      ClassID: [''],
      Email: ['']
    });
  }
 
  
  onSubmitMobile() {
    this.isOtp = 1;
    this.CreateOtpForm();
  }
  onOtpChange(event: any) {

  }
  onVerifyOTP() {
    this.CreateOUserPanDetailform();
this.isOtp=2;
  }
  
  SubmitPanDetail(){
    this.isOtp=3;
  }
  
  
 
}
