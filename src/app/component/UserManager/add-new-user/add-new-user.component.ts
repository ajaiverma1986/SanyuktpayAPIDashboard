import { Component, OnInit } from '@angular/core';
import { CreateNewUserRequest, UserTypeListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterDataService } from '../../../services/master-data.service';

@Component({
  selector: 'app-add-new-user',
  standalone: true,
  imports: [MatTableModule, MatCardModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-new-user.component.html',
  styleUrl: './add-new-user.component.scss'
})
export class AddNewUserComponent extends BasecomponentComponent implements OnInit {
  listdata: any;
  Modeldata!: UserTypeListResponse[];
  frmAddUser!: FormGroup;
  Model: CreateNewUserRequest = new CreateNewUserRequest();
  UserID!: string;

  constructor(private userser: UserMasterService, private msts: MasterDataService, private fb: FormBuilder, toast: ToastrService) {
    super(toast);
    this.createForm();
  }
  ngOnInit(): void {
    this.msts.UserTypeAdminList().subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
      }
    });
  }

  clearData() {
    this.frmAddUser.reset(this.frmAddUser.value);
  }


  OnDataSubmit() {
    this.Model.applicationID = 1;
    this.Model.Password = this.frmAddUser.get("Passwor")?.value;
    this.Model.UserTypeId = Number(this.frmAddUser.get("UserTypeId")?.value);
    this.Model.AccessID = this.frmAddUser.get("AccessID")?.value;

    this.userser.CreateNewUserData(this.Model).subscribe({
      next: (data) => {
        this.UserID = data.Result;
        if (Number(this.UserID) > 0) {
          this.showToaster(1, "User Successfully Created", "User Manager");
          this.clearData();
        }
        else {
          this.showToaster(3, "User not created", "User Manager");
          this.clearData();
        }
      }
    });


  }
  createForm() {

    this.frmAddUser = this.fb.group({
      UserTypeId: ['', Validators.required],
      Passwor: ['', Validators.required],
      ConfirmPass: ['', Validators.required],
      AccessID: ['', Validators.required]

    });
  }

}
