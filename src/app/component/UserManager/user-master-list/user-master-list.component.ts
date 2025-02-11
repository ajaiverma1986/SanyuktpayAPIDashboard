import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import {  MatIconModule } from "@angular/material/icon"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivateAPIUserMasterRequest, ActivateAPIUserRequest, ListUserMasterRequest } from '../../../RequestModel/UserRequest';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { Router } from '@angular/router';
import { ListUserMasterResponse } from '../../../ResponseModel/UserResponse';
@Component({
  selector: 'app-user-master-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIconModule, MatPaginatorModule, NgbModule],
  templateUrl: './user-master-list.component.html',
  styleUrl: './user-master-list.component.scss'
})
export class UserMasterListComponent extends BasecomponentComponent implements OnInit {
  Modeldata!: ListUserMasterResponse[];
  displayedColumns: string[] = ['UserName', 'OrganisationName', 'ContactPerson', 'MobileNo', 'EmailId', 'StatusName', 'UpdatedBy', 'actions',];
  Model: ListUserMasterRequest = new ListUserMasterRequest();
  FrmUserMgr!: FormGroup;
  ModelAct: ActivateAPIUserMasterRequest = new ActivateAPIUserMasterRequest();
  UserIdn!: number;

  length!: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 15, 25, 50, 100, 500];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  RemarkReason!: string;

  pageEvent!: PageEvent;

  constructor(private router: Router, private fb: FormBuilder, private usrser: UserMasterService, toast: ToastrService, private dialog: MatDialog) {
    super(toast);
    this.createForm();
  }
  createForm() {
    this.FrmUserMgr = this.fb.group({
      Mobileno: [''],
      EmailId: ['']
    });
  }

  ngOnInit(): void {

    this.getPageData(1);
  }
  getPageData(pagenum: number) {

    this.Model.PageNo = pagenum;
    this.Model.PageSize = this.pageSize;
    this.Model.UserMasterId = 0;
    this.Model.EmailId = this.FrmUserMgr.get("EmailId")?.value;
    this.Model.MobileNo = this.FrmUserMgr.get("Mobileno")?.value;
    this.usrser.GetAllUserMasterList(this.Model).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
        this.length = data.TotalRecords;
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getPageData(this.pageIndex + 1);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onSubmit() {
    this.Model.UserMasterId = 0;
    this.Model.PageNo = 1;
    this.Model.PageSize = 10;
    this.Model.EmailId = this.FrmUserMgr.get("EmailId")?.value;
    this.Model.MobileNo = this.FrmUserMgr.get("Mobileno")?.value;
    this.usrser.GetAllUserMasterList(this.Model).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
        this.length = data.TotalRecords;
      }
    });

  }

  
  OnActivateDeactivated(UserMasterID: any,status:number) {
    this.ModelAct.Reason = "";
    this.ModelAct.Status = status;
    this.ModelAct.UserMasterId = UserMasterID;
    this.usrser.ActivateDeactivateUserMaster(this.ModelAct).subscribe({
      next: (data) => {
        this.UserIdn = Number(data.Result);
        if (this.UserIdn > 0) {
          this.onSubmit();
          this.showToaster(1, "Status Changed successfully", "User  Manager")
        }
        else {
          this.onSubmit();
          this.showToaster(1, "Status not  Changed successfully", "User  Manager")
        }
      }
    });
  }
}
