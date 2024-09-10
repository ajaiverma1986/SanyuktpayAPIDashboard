import { Component, OnInit, ViewChild } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import {   ReactiveFormsModule } from '@angular/forms';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'
import { CompanyTypeMasterResponse, KycTypeMasterListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { UserKYYCResponse } from '../../../RequestModel/UserRequest';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ViewDocumentComponent } from '../../Onboarding/view-document/view-document.component';
import { MatDialog, MatDialogConfig,MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: 'app-org-kyc-checker',
  standalone: true,
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

  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;

  constructor(private users: UserMasterService,toster: ToastrService,private acrout:ActivatedRoute, private dialog: MatDialog) {
    super(toster)
   
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
}
