import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MasterDataService } from '../../../services/master-data.service';
import { ClassListResponse } from '../../../RequestModel/MasterDataResponse';
import { UtilityserService } from '../../../services/utilityser.service';
import { ToastrService } from 'ngx-toastr';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { OTPRequest, OTPValidateRequest } from '../../../RequestModel/UtilityRequest';
import { StudentRegistrationRequest } from '../../../RequestModel/StudentRequest';
import { StudentMasterService } from '../../../services/student-master.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgOtpInputComponent, MatButtonModule, NgbModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends BasecomponentComponent implements OnInit {

  isOtp: number = 0;
  frmregister1!: FormGroup;
  frmrverifyotp!: FormGroup;
  FrmUserType!: FormGroup;
  frmPanDetails!: FormGroup;
  frmAadharDetails!: FormGroup;
  frmEmailVerification!: FormGroup;
  selectedvalue!: string;
  selectedDate: any;
  classlst!: ClassListResponse[];
  selectedvalueMode: number = 0;
  Model1: OTPRequest = new OTPRequest();
  Model2: OTPValidateRequest = new OTPValidateRequest();
  Model3: StudentRegistrationRequest = new StudentRegistrationRequest();

  constructor(private fb: FormBuilder, private mds: MasterDataService, private utilser: UtilityserService, private sms: StudentMasterService, toastsr: ToastrService) {
    super(toastsr);
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
      MobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],

    });
  }
  CreateOtpForm() {
    this.frmrverifyotp = this.fb.group({
      ngOtpInput: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    });
  }

  CreateOUserPanDetailform() {
    this.frmPanDetails = this.fb.group({
      FristName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      LastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      dob: ['', [Validators.required]],
      ClassID: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmitMobile() {
    this.Model1.mobileno = this.frmregister1.value.MobileNo;
    this.utilser.GenerateOTP(this.Model1).subscribe({
      next: (data) => {
        console.log(data);
        if (data.HasError) {

          this.showToaster(3, data.Errors[0].ErrorMessage, "Registration");

        } else {
          this.isOtp = 1;
          this.CreateOtpForm();
          this.showToaster(1, "OTP Sent Successfully", "Registration");
        }
      },
      error: (err) => {
        this.showToaster(3, err.error.Message, "Registration");
      }
    });
  }
  onOtpChange(event: any) {

  }
  onVerifyOTP() {
    this.Model2.mobileno = this.frmregister1.value.MobileNo;
    this.Model2.otp = this.frmrverifyotp.value.ngOtpInput;
    this.utilser.ValidateOTP(this.Model2).subscribe({
      next: (data) => {
        if (data.HasError) {
          this.showToaster(3, data.Errors[0].ErrorMessage, "Registration");
        } else {
          this.isOtp = 2;
          this.CreateOUserPanDetailform();
          this.showToaster(1, "OTP Verified Successfully", "Registration");

        }
      },
      error: (err) => {
        this.showToaster(3, err.error.Message, "Registration");
      }
    });
  }

  SubmitPanDetail() {
    let val1 = (this.frmPanDetails.get("dob")?.value).year + "-" + (this.frmPanDetails.get("dob")?.value).month + "-" + (this.frmPanDetails.get("dob")?.value).day;
    
    this.Model3.FirstName = this.frmPanDetails.value.FristName;
    this.Model3.LastName = this.frmPanDetails.value.LastName;
    this.Model3.EmailId = this.frmPanDetails.value.Email;
    this.Model3.MobileNo = this.frmregister1.value.MobileNo;
    this.Model3.DOB = formatDate(val1, 'yyyy-MM-dd', 'en');
    this.Model3.ClassId =Number(this.frmPanDetails.value.ClassID);
   
    this.sms.AddNewStudentRegistration(this.Model3).subscribe({
      next: (data) => {
        if (data.HasError) {
          console.log(data);
          this.showToaster(3, data.Errors[0].ErrorMessage, "Registration");
        }
        else {
          this.showToaster(1, "Registration Successfully", "Registration");
          this.isOtp = 0;
          this.frmregister1.reset();
          this.frmPanDetails.reset();
        }
      },
      error: (err) => {
        this.showToaster(3, err.error.ErrorMessage, "Registration");
      }
    });
  }
}
