import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  frmRegistration!: FormGroup

  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  ngOnInit(): void {

  }
  createForm() {
    this.frmRegistration = this.fb.group({
      Email: ['', Validators.required],
      OrgName: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Passwor: ['', Validators.required],
      ConfirmPass: ['', Validators.required]

    });
  }

  onRegistreSubmit(){

  }

}
