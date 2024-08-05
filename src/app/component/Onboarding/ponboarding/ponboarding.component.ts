import { Component, model, OnInit } from '@angular/core';
import { MasterDataService } from '../../../services/master-data.service';
import { UserTypeListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUserWithLogoRequest } from '../../../RequestModel/UserRequest';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-ponboarding',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './ponboarding.component.html',
  styleUrl: './ponboarding.component.css'
})
export class PonboardingComponent implements OnInit {
  listdata: any;
  Modeldata!: UserTypeListResponse[];
  selectedValue!: string;
  frmOnboarding!: FormGroup;
  UserId!:string;
  Model: CreateUserWithLogoRequest = new CreateUserWithLogoRequest();

  status: "initial" | "uploading" | "success" | "fail" = "initial";
  files: File[] = [];


  constructor(private mstdataservice: MasterDataService, private frmBuilder: FormBuilder, private users: UserMasterService) { }

  ngOnInit(): void {
    this.selectedValue = "0";
    this.frmOnboarding = this.frmBuilder.group({
      Usertype: []
    });
    
    this.mstdataservice.UserTypeList().subscribe({
      next: (SimpleResponse) => {
        this.Modeldata = SimpleResponse.Result;

      }
    });
  }
  ChangeUserType(): void {
    console.log(this.selectedValue);
  }

  OnboardingSubmit(): void {
    this.users.UserOnboarding(this.Model).subscribe({
      next: (SimpleResponse) => {
        this.UserId = SimpleResponse.Result;
        console.log("This is UserId" + this.UserId);
      }
    });
  }

  onFileChange(event: any) {
    const files = event.target.files;

    if (files.length) {
      this.status = "initial";
      this.files = files;
    }
  }

  onUpload() {
    if (this.files.length) {
      const formData = new FormData();

      [...this.files].forEach((file) => {
        formData.append("file", file, file.name);
      });

      const upload$ = this.users.UserOnboarding(this.Model);

      console.log(upload$);

      this.status = "uploading";

      upload$.subscribe({
        next: () => {
          this.status = "success";
        },
        error: (error: any) => {
          this.status = "fail";
          return throwError(() => error);
        },
      });
    }
  }

}
