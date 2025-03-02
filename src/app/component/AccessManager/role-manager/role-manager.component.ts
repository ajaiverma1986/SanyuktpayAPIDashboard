import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { MasterDataService } from '../../../services/master-data.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatIconModule } from "@angular/material/icon"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {  SimpleResponse } from '../../../RequestModel/MasterDataResponse';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { GetRoleResponse } from '../../../ResponseModel/SysMgrResponse';
import { CreateRoleRequest, GetRoleRequest } from '../../../RequestModel/SysMgrRequest';
import { SysMgrService } from '../../../services/sys-mgr.service';


@Component({
  selector: 'app-role-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIconModule, NgbModule],
  templateUrl: './role-manager.component.html',
  styleUrl: './role-manager.component.scss'
})
export class RoleManagerComponen extends BasecomponentComponent implements OnInit {
  Model: CreateRoleRequest = new CreateRoleRequest();
  Modeldata: SimpleResponse = new SimpleResponse();
  fromrole!: FormGroup;
  Addnew: boolean = false;
  outletresp!: GetRoleResponse[];
  ModelReq: GetRoleRequest = new GetRoleRequest();
  displayedColumns: string[] = ['RoleID', 'RoleName', 'RoleDescription', 'StatusName'];

  constructor(private mds: MasterDataService, private sservice: SysMgrService, private fb: FormBuilder, toast: ToastrService) {
    super(toast);
    this.createForm();
  }
  createForm() {
    this.fromrole = this.fb.group({
      RoleName: ['', [Validators.required]],
      RoleDescription: ['']
     
    });
  }
  AddNewRequest() {
    this.Addnew = true;
  }
  ngOnInit(): void {
    this.GetAllData();
  }
  
  GetAllData() {
    this.ModelReq.RoleID = 0;
    this.ModelReq.RoleName = "";
    this.ModelReq.Status =1;
    this.sservice.GetallRoles(this.ModelReq).subscribe({
      next: (data) => {
        this.outletresp = data.Result;
console.log(this.outletresp);
      }
    });
  }

  GoToBack() {
    this.GetAllData();
    this.Addnew = false;
  }
  onSubmit() {
    this.Model.RoleName = this.fromrole.get("RoleName")?.value;
    this.Model.RoleDescription = this.fromrole.get("RoleDescription")?.value;
    this.sservice.CreateNewRoles(this.Model).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;

        if (Number(this.Modeldata.Result) > 0) {
          this.showToaster(1, "Successfully Created", "Master");
          this.fromrole.reset(this.fromrole.value);
          this.GetAllData();
          this.Addnew = false;
        }
        else {
          this.GetAllData();
          this.showToaster(3, this.Modeldata.Errors[0].ErrorMessage.toString(), "User Master");
        }
      }
    });

  }
  getInvalidControls() {
    const invalidControls = [];
    const controls = this.fromrole.controls;
    for (const name in controls) {
      if (controls[name].invalid && controls[name].touched) {
        invalidControls.push(name);
      }
    }
    return invalidControls;
  }


}
