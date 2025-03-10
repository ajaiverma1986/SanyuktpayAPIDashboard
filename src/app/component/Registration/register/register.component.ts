import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxOtpInputComponent, NgxOtpInputComponentOptions } from 'ngx-otp-input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgxOtpInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  otpOptions: NgxOtpInputComponentOptions = {otpLength:6};
  frmregister1!: FormGroup;
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
  onSubmit(){

  }

}
