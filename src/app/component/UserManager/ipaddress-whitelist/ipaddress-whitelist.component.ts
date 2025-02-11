import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import { ApplicationListResponse } from '../../../RequestModel/MasterDataResponse';
import { ApproveRejectIPAddressRequest, IPAddressListDetail, ListOrganisationDetailRequest } from '../../../RequestModel/UserRequest';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { GetIPAddressResponse, ListOrganisationResponse } from '../../../ResponseModel/UserResponse';
import { PageEvent } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-ipaddress-whitelist',
  standalone: true,
  imports: [FormsModule, CommonModule, MatTableModule, MatCardModule,ReactiveFormsModule,MatIconModule],
  templateUrl: './ipaddress-whitelist.component.html',
  styleUrl: './ipaddress-whitelist.component.scss'
})
export class IPAddressWhitelistComponent extends BasecomponentComponent implements OnInit {
  UserId!: number;
  Model: ApproveRejectIPAddressRequest = new ApproveRejectIPAddressRequest();
  appData!: ApplicationListResponse[];
  selectedValue!: number;
  selectedapp!: number;
  NewModel:IPAddressListDetail=new IPAddressListDetail();
  Modeldata!: GetIPAddressResponse[];
  displayedColumns: string[] = ['IPAddressId', 'OrganisationName', 'ApplicationName', 'IPAddress', 'StatusName', 'CreatedOn', 'CreatedBy', 'UpdatedOn', 'UpdatedBy', 'actions',];
  dataSource = this.Modeldata;
  FrmUserMgr!:FormGroup;
  userModel!:ListOrganisationResponse[];
  Modeluser:ListOrganisationDetailRequest=new ListOrganisationDetailRequest();

  length!: number;
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [20, 30, 40, 50, 100, 500];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;


  constructor(private routs: Router, private users: UserMasterService,private fb: FormBuilder, toster: ToastrService) {
    super(toster)
    this.createForm();
  }
  ngOnInit(): void {
this.selectedValue=0;
this.selectedapp=0;

this.Modeluser.PageNo = 1;
    this.Modeluser.PageSize = 500;
    this.Modeluser.UserId = 0;
    this.Modeluser.EmailId = '';
    this.Modeluser.MobileNo = '';

this.users.ListOrganisationDetails(this.Modeluser).subscribe({
next:(data)=>{
  this.userModel=data.Result;
}
});

    this.FillGrid1(1);
  }

  OrgChange(){
    this.selectedValue=Number( this.FrmUserMgr.get("UserId")?.value);
    this.users.ListApplicationForAdmin(this.selectedValue).subscribe({
      next:(data1)=>{
        this.appData=data1.Result;
      }
    });
  }
  createForm() {
    this.FrmUserMgr = this.fb.group({
      UserId:[''],
      Applicationid:[''],
      Status:['']
    });
  }
  FillGrid1(pagenum: number) {
    this.NewModel.PageNo=pagenum;
    this.NewModel.PageSize=this.pageSize;
    this.NewModel.Status=Number( this.FrmUserMgr.get("Status")?.value);;
    this.NewModel.UserId=Number( this.FrmUserMgr.get("UserId")?.value);
    this.NewModel.applicationID==Number( this.FrmUserMgr.get("Applicationid")?.value);
    this.users.ListAllIPAddress(this.NewModel).subscribe({
      next: (data1) => {
        this.Modeldata = data1.Result;
        this.length=data1.TotalRecords;
        
      }
    });
  }
  FillGrid() {
    this.NewModel.PageNo=1;
    this.NewModel.PageSize=20;
    this.NewModel.Status=Number( this.FrmUserMgr.get("Status")?.value);;
    this.NewModel.UserId=Number( this.FrmUserMgr.get("UserId")?.value);
    this.NewModel.applicationID==Number( this.FrmUserMgr.get("Applicationid")?.value);
    this.users.ListAllIPAddress(this.NewModel).subscribe({
      next: (data1) => {
        this.Modeldata = data1.Result;
        this.length=data1.TotalRecords;
        
      }
    });
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.FillGrid1(this.pageIndex + 1);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  ApproveAddress(addressid: number) {
    this.Model.IpAddressId = addressid;
    this.Model.Status = 2;
    this.users.ApproveRejectIP(this.Model).subscribe({
      next: (data) => {
        this.UserId = data.Result;
        if (this.UserId > 0) {
          this.showToaster(1, "Successfully Approved", "IP Manager");
        }
        else {
          this.showToaster(3, "Not Approved", "IP Manager");
        }
        this.FillGrid();
      }
    });

  }
  RejectAddress(addressid: number) {
    this.Model.IpAddressId = addressid;
    this.Model.Status = 3;
    this.users.ApproveRejectIP(this.Model).subscribe({
      next: (data) => {
        this.UserId = data.Result;
        if (this.UserId > 0) {
          this.showToaster(1, "Successfully Rejected", "IP Manager");
        }
        else {
          this.showToaster(3, "Not reejcted", "IP Manager");
        }
        this.FillGrid();
      }
    });

  }
  DeleteAddress(addressid: number) {
    this.Model.IpAddressId = addressid;
    this.Model.Status = 99;
    this.users.ApproveRejectIP(this.Model).subscribe({
      next: (data) => {
        this.UserId = data.Result;
        if (this.UserId > 0) {
          this.showToaster(1, "Successfully Deleted", "IP Manager");
        }
        else {
          this.showToaster(3, "Not Deleted", "IP Manager");
        }
        this.FillGrid();
      }
    });

  }
  ExportToExcel(){
    this.exportAsExcelFile(this.Modeldata,"IPAddrssList");
  }
}
