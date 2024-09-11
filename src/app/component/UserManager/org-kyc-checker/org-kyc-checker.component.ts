import { Component, OnInit, ViewChild } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import {   FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'
import { CompanyTypeMasterResponse, KycTypeMasterListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { ApproveRejectUserDocumentRequest, UserKYYCResponse } from '../../../RequestModel/UserRequest';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatTable } from '@angular/material/table';
import { ActivatedRoute,Router } from '@angular/router';
import { ViewDocumentComponent } from '../../Onboarding/view-document/view-document.component';
import { MatDialog,MatDialogModule } from "@angular/material/dialog";


@Component({
  selector: 'app-org-kyc-checker',
  standalone: true,
  preserveWhitespaces:true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, MatIcon, MatIconModule,MatDialogModule],
  templateUrl: './org-kyc-checker.component.html',
  styleUrl: './org-kyc-checker.component.scss'
})
export class OrgKycCheckerComponent extends BasecomponentComponent implements OnInit {
  selectedFile: File | null = null;
  companyData!: CompanyTypeMasterResponse[];
  selectedValueCom!: string;
  selectedvaluekyc!: string;
  kyctypeList!: KycTypeMasterListResponse[];
  Modeldata!: UserKYYCResponse[];
  displayedColumns: string[] = ['UserKYCID', 'KycTypeName', 'DocumentNo', 'CreatedOn', 'CreatedBy', 'StatusName', 'actions',];
  dataSource = this.Modeldata;
  UserId!:number;
  KycId!:number;
  AppRejModel:ApproveRejectUserDocumentRequest=new ApproveRejectUserDocumentRequest();
  Frmorgdocchecker!:FormGroup;
  RejectReason!:string

  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;

  constructor(private users: UserMasterService,toster: ToastrService,private acrout:ActivatedRoute,private rout:Router, private dialog: MatDialog,private fb:FormBuilder) {
    super(toster)
    this.createForm();
   
  }
  ngOnInit(): void {
    this.acrout.queryParams.subscribe(p => {
      this.UserId = p['UserId'];
  });

this.getdallKycData();
  }
  getdallKycData() {
    this.users.ListUserKYCByUserId(this.UserId).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
      }
    })
  }

  OpenModel=(UserKYCID:any)=>{
    
    const dialogRef = this.dialog.open(ViewDocumentComponent, {
      width: '700px',
      height:'700px',
      backdropClass:'popupBackdropClass',
      data:UserKYCID
    });
  }
  ApproveReject(UserKYCID:number,apptype:number){

    
    if(apptype==2)
    {
      this.RejectReason=this.Frmorgdocchecker.get("RejectedReason")?.value;
      
      this.AppRejModel.Status=3;
      if(this.RejectReason=="")
        {
          this.showToaster(3,"Rejected Reason is Required","Onboarding");
          
          return;
        }
    }
    else
    {
      this.AppRejModel.RejectedReason=this.Frmorgdocchecker.get("RejectedReason")?.value;
      this.AppRejModel.Status=2;
     
    }
    this.AppRejModel.UserKYCID=UserKYCID;
    this.users.ApproveRejectUserdoc(this.AppRejModel).subscribe({
      next:(data)=>{
        this.KycId=data.Result;
        console.log(data.Result);
        if(this.KycId>0){
          if(apptype==1)
          {
            this.showToaster(1,"Dcoument Approved successfully","Onboarding");
            this.getdallKycData();
          }
          else
          {
            this.showToaster(1,"Dcoument Rejected successfully","Onboarding");
            this.getdallKycData();
          }
        }
      }
    });
  }
  createForm() {
    this.Frmorgdocchecker = this.fb.group({
      RejectedReason: ['']
    });
  }
  BacktoPre(){
    this.rout.navigate(["/Dashboard/"])
  }
}
