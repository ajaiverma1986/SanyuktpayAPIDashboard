import { Component, OnInit } from '@angular/core';
import { ApplicationListResponse, CreateNewUserRequest, UserrListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-apiuser',
  standalone: true,
  imports: [MatTableModule, MatCardModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-apiuser.component.html',
  styleUrl: './create-apiuser.component.scss'
})
export class CreateAPIUserComponent extends BasecomponentComponent implements OnInit {
  listdata: any;
  Modeldata!: UserrListResponse[];
  appData!: ApplicationListResponse[];
  displayedColumns: string[] = ['UserMasterID', 'UserName', 'OrganisationName', 'UserType', 'DisplayName', 'EmailId', 'MobileNo',];
  dataSource = this.Modeldata;
  addnew: boolean = false;
  frmAddUser!: FormGroup;
  Model: CreateNewUserRequest = new CreateNewUserRequest();
  UserID!: string;
  isbutton: boolean = false;

  constructor(private userser: UserMasterService, private fb: FormBuilder, toast: ToastrService) {
    super(toast);
    this.createForm();
  }
  ngOnInit(): void {

    this.getAllAppData();
    this.userser.ListApplication().subscribe({
      next: (data) => {
        this.appData = data.Result;
        if (this.appData.length == 0) {
          this.isbutton = false;
        }

      }
    });
  }
  getAllAppData() {
    this.userser.ListUsers().subscribe({
      next: (data) => {
        this.Modeldata = data.Result;


      }
    });
  }
  clearData() {
    this.frmAddUser.reset(this.frmAddUser.value);
  }
  AddNew() {
    this.addnew = true;
  }

  OnDataSubmit() {
    this.Model.applicationID = Number(this.frmAddUser.get("ApplicationID")?.value);
    this.Model.Password = this.frmAddUser.get("Passwor")?.value;
    this.Model.UserTypeId = 2;
    this.Model.AccessID = this.frmAddUser.get("AccessID")?.value;

    this.userser.CreateNewUserData(this.Model).subscribe({
      next: (data) => {
        this.UserID = data.Result;
        if (Number(this.UserID) > 0) {
          this.showToaster(1, "User Successfully Created", "API Manager");
          this.getAllAppData();
          this.addnew = false;
          this.clearData();
        }
        else {
          this.showToaster(3, "User not created", "API Manager");
          this.getAllAppData();
          this.addnew = false;
          this.clearData();
        }
      }
    });


  }
  createForm() {

    this.frmAddUser = this.fb.group({
      ApplicationID: ['', Validators.required],
      Passwor: ['', Validators.required],
      ConfirmPass: ['', Validators.required],
      AccessID: ['', Validators.required]

    });
  }
  BackToPre(){
    this.addnew=false;
  }
}
