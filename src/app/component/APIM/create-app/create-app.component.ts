import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApplicationListResponse, CreateApplicationRequest } from '../../../RequestModel/MasterDatarESPONSE';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-app',
  standalone: true,
  imports: [MatTableModule, MatCardModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-app.component.html',
  styleUrl: './create-app.component.scss'
})
export class CreateAppComponent extends BasecomponentComponent implements OnInit {
  listdata: any;
  Modeldata!: ApplicationListResponse[];
  displayedColumns: string[] = ['ApplicationID', 'OrganisationName', 'EmailId', 'MobileNo', 'ApplicationName', 'ApplicationToken',];
  dataSource = this.Modeldata;
  addnew: boolean = false;
  frmApp!: FormGroup;
  Model: CreateApplicationRequest = new CreateApplicationRequest();
  AppId!: string;

  constructor(private userser: UserMasterService, private fb: FormBuilder, toast: ToastrService,private routs:Router) {
    super(toast);
    this.createForm();
  }
  ngOnInit(): void {
    this.getAllAppData();
  }
  getAllAppData() {
    this.userser.ListApplication().subscribe({
      next: (data) => {
        this.Modeldata = data.Result;

      }
    });
  }
  clearData() {
    this.frmApp.reset(this.frmApp.value);
  }
  AddNewApplication() {
    this.addnew = true;
  }
 
  OnSubmit() {

    this.Model.ApplicationDescription = this.frmApp.get("ApplicationDescription")?.value;
    this.Model.ApplicationName = this.frmApp.get("ApplicationName")?.value;
    if (this.Model.ApplicationName == "") {
      this.showToaster(3, "Application name can't be blank", "API Manager")
    }
    this.userser.CreateNewApplication(this.Model).subscribe({
      next: (data) => {
        this.AppId = data.Result;
        if (Number(this.AppId) > 0) {
          this.showToaster(1, "Application Successfully Created", "API Manager")
          this.addnew = false;
          this.getAllAppData();
          this.clearData();
        }
      }

    });
  }
  createForm() {
    this.frmApp = this.fb.group({
      ApplicationName: ['', Validators.required],
      ApplicationDescription: ['',],

    });
  }
  BacktoPre(){
   // this.routs.navigate(['/Dashboard/APIuser']);
   this.addnew=false;
  }
}
