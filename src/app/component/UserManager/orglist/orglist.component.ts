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
import { PayinRequestListResponse } from '../../../RequestModel/TransactionResponse';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivateAPIUserRequest, ListOrganisationDetailRequest } from '../../../RequestModel/UserRequest';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orglist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIconModule, MatPaginatorModule, NgbModule],
  templateUrl: './orglist.component.html',
  styleUrl: './orglist.component.scss'
})
export class OrglistComponent extends BasecomponentComponent implements OnInit {
  Modeldata!: PayinRequestListResponse[];
  displayedColumns: string[] = ['Usercode', 'OrganisationName', 'ContactPerson', 'MobileNo', 'EmailId', 'StatusName', 'UpdatedOn', 'UpdatedBy', 'actions',];
  Model: ListOrganisationDetailRequest = new ListOrganisationDetailRequest();
  FrmUserMgr!: FormGroup;
  ModelAct: ActivateAPIUserRequest = new ActivateAPIUserRequest();
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
    this.Model.UserId = 0;
    this.Model.EmailId = this.FrmUserMgr.get("EmailId")?.value;
    this.Model.MobileNo = this.FrmUserMgr.get("Mobileno")?.value;
    this.usrser.ListOrganisationDetails(this.Model).subscribe({
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
    this.Model.UserId = 0;
    this.Model.PageNo = 1;
    this.Model.PageSize = 10;
    this.Model.EmailId = this.FrmUserMgr.get("EmailId")?.value;
    this.Model.MobileNo = this.FrmUserMgr.get("Mobileno")?.value;
    this.usrser.ListOrganisationDetails(this.Model).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
        this.length = data.TotalRecords;
      }
    });

  }

  OnViewdocuments(UserId: any) {
    this.router.navigateByUrl('/Dashboard/Orgkycchk?UserId=' + UserId + '&ado=1');
  }
  Onviewconfiguration(UserId: any) {
    this.router.navigateByUrl('/Dashboard/Orgconfg?UserId=' + UserId + '&ado=1');
  }
  OnActivateDeactivated(UserId: any,status:number) {
    this.ModelAct.Reason = "";
    this.ModelAct.Status = status;
    this.ModelAct.UserId = UserId;
    this.usrser.ActivateDeactivateApiUser(this.ModelAct).subscribe({
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
