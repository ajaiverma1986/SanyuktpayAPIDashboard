import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { MasterDataService } from '../../../services/master-data.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { MatIconModule } from "@angular/material/icon"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  GenderResponse, SimpleResponse } from '../../../RequestModel/MasterDataResponse';
import { ConfigService } from '../../../services/ApplicationServices/config.service';
import {  CommissionDistributionResponse } from '../../../ResponseModel/ConfigurationResponse';
import { CreateNewOutLetRequest } from '../../../RequestModel/UserRequest';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';


@Component({
  selector: 'app-createmds',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIconModule, MatPaginatorModule, NgbModule],
  templateUrl: './createmds.component.html',
  styleUrl: './createmds.component.scss'
})
export class CreatemdsComponent extends BasecomponentComponent implements OnInit {
  Model: CreateNewOutLetRequest = new CreateNewOutLetRequest();
  Modeldata:SimpleResponse=new SimpleResponse();
  frmmds!: FormGroup;
  selectedvalue!: string
  Addnew: boolean = false;
  genderdata!: GenderResponse[];


  constructor(private mds: MasterDataService,private usrser:UserMasterService, private fb: FormBuilder, toast: ToastrService) {
    super(toast);
    this.createForm();
  }
  createForm() {
    this.frmmds = this.fb.group({
      FirstName: ['',[Validators.required]],
      MiddleName: [''],
      LastName: [''],
      GenderID: ['',[Validators.required]],
      OrganisationName: [''],
      MobileNo: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      EmailId: ['',[Validators.required,Validators.email]]
    });
  }
  AddNewRequest() {
    this.Addnew = true;
  }
  ngOnInit(): void {
    
    this.selectedvalue = "0";
    
    this.ListGender();
  }
  ListGender()
  {
    this.mds.GenderList().subscribe({
      next:(SimpleResponse)=>{
        this.genderdata=SimpleResponse.Result;
      }
    });
  }
  // getPageData() {
  //   this.txnser.ListCommissionDistribution(this.Model).subscribe({
  //     next: (data) => {
  //       this.Modeldata = data.Result;
  //     }
  //   });
  // }



  onSubmit() {
    this.Model.EmailId = this.frmmds.get("EmailId")?.value;
    this.Model.FirstName = this.frmmds.get("EmailId")?.value;
    this.Model.LastName = this.frmmds.get("LastName")?.value;
    this.Model.MiddleName = this.frmmds.get("MiddleName")?.value;
    this.Model.MobileNo = this.frmmds.get("MobileNo")?.value;
    this.Model.OrganisationName = this.frmmds.get("OrganisationName")?.value;
    this.Model.ParentID = 0;
    this.Model.UserTypeId = 5;
    this.Model.GenderID = Number(this.frmmds.get("GenderID")?.value);

    this.usrser.AddNewOutlet(this.Model).subscribe({
      next: (data) => {
        this.Modeldata = data;
   
        if( Number(this.Modeldata.Result)>0)
        {
          this.showToaster(1,"MDS Successfully Created","User Master");
          this.frmmds.reset(this.frmmds.value);
        }
        else
        {
          this.showToaster(3,this.Modeldata.Errors[0].ErrorMessage.toString(),"User Master");
        }
      }
    });

  }


}
