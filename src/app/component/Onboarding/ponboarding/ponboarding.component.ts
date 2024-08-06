import { Component, model, OnInit } from '@angular/core';
import { MasterDataService } from '../../../services/master-data.service';
import { UserTypeListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateUserWithLogoRequest, UploadOrgLogo1 } from '../../../RequestModel/UserRequest';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-ponboarding',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './ponboarding.component.html',
  styleUrl: './ponboarding.component.css'
})
export class PonboardingComponent implements OnInit {
  listdata: any;
  Modeldata!: UserTypeListResponse[];
  selectedValue!: string;
  frmOnboarding!: FormGroup;
  UserId!: number;
  files!: File;
  Model: CreateUserWithLogoRequest = new CreateUserWithLogoRequest();
  Model1:UploadOrgLogo1=new UploadOrgLogo1();



  constructor(private mstdataservice: MasterDataService, private frmBuilder: FormBuilder, private users: UserMasterService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.Model.UserTypeId = 0;
    this.selectedValue = "0";


    this.mstdataservice.UserTypeList().subscribe({
      next: (SimpleResponse) => {
        this.Modeldata = SimpleResponse.Result;

      }
    });
  }
  createForm() {
    this.frmOnboarding = this.frmBuilder.group({
      Usertype: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      Mobilename: ['', Validators.required]

    });
  }
  ChangeUserType(): void {
    console.log(this.selectedValue);
  }

  OnboardingSubmit(): void {
    this.Model.UserTypeId = Number(this.frmOnboarding.get("Usertype")?.value);
    this.Model.EmailId = this.frmOnboarding.get("email")?.value;
    this.Model.FirstName = this.frmOnboarding.get("firstName")?.value;
    this.Model.MiddleName = this.frmOnboarding.get("middleName")?.value;
    this.Model.LastName = this.frmOnboarding.get("lastName")?.value;
    this.Model.MobileNo = this.frmOnboarding.get("Mobilename")?.value;

    this.users.UserOnboarding(this.Model).subscribe({
      next: (SimpleResponse) => {
        this.UserId = Number(SimpleResponse.Result);
        if (this.UserId > 0) {
          this.Model1.iform=this.files;
          this.Model1.UserId=this.UserId;
          this.users.UploadUserLogo(this.Model1).subscribe({
            next: (SimpleResponse) => {
              console.log(SimpleResponse);
            }
          })
        }

      }
    });
  }

  onFileChange(event: any) {
    const filesp = event.target.files;

    if (filesp.length) {

      this.files = filesp;
     // console.log(this.files);
    }
  }



}
