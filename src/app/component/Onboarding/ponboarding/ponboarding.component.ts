import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../../../services/master-data.service';
import { UserTypeListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateUserWithLogoRequest } from '../../../RequestModel/UserRequest';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-ponboarding',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './ponboarding.component.html',
  styleUrl: './ponboarding.component.scss'
})
export class PonboardingComponent  extends BasecomponentComponent implements OnInit {
  listdata: any;
  Modeldata!: UserTypeListResponse[];
  selectedValue!: string;
  frmOnboarding!: FormGroup;
  UserId!: number;
  Model: CreateUserWithLogoRequest = new CreateUserWithLogoRequest();
  



  constructor(private mstdataservice: MasterDataService, private frmBuilder: FormBuilder, private users: UserMasterService,toster:ToastrService) {
    super(toster)
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
      email: ['', [Validators.required,Validators.email]],
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
        
          this.showToaster(1,"Record Saved Successfully","Partner Onboarding");
         
        }
        else
        {
          console.log(SimpleResponse);
          this.showToaster(3,"Record Not Saveed Successfully","Partner Onboarding");
        }

      }
    });
  }

  
}
