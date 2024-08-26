import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { MasterDataService } from '../../../services/master-data.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { CompanyTypeMasterResponse, KycTypeMasterListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { UserKYYCResponse } from '../../../RequestModel/UserRequest';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";
import { MatIcon, MatIconModule } from "@angular/material/icon"
import { PopupserviceService } from '../../../services/common/popupservice.service';
import { MatDialog, MatDialogConfig,MatDialogModule } from "@angular/material/dialog";
import { ViewDocumentComponent } from '../view-document/view-document.component'
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-user-kyc',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIcon, MatIconModule,MatDialogModule],
  templateUrl: './user-kyc.component.html',
  styleUrl: './user-kyc.component.scss'
})
export class UserKYCComponent extends BasecomponentComponent implements OnInit {
  uploadForm!: FormGroup;
  selectedFile: File | null = null;
  companyData!: CompanyTypeMasterResponse[];
  selectedValueCom!: string;
  selectedvaluekyc!: string;
  kyctypeList!: KycTypeMasterListResponse[];
  Modeldata!: UserKYYCResponse[];
  displayedColumns: string[] = ['UserKYCID', 'KycTypeName', 'DocumentNo', 'CreatedOn', 'CreatedBy', 'StatusName', 'actions',];
  dataSource = this.Modeldata;
  addnew: boolean = false;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;


  constructor(private ngxs: NgxSpinnerService, private fb: FormBuilder, private hhtp: HttpClient,
    private mstdataservice: MasterDataService, private frmBuilder: FormBuilder, private pops: PopupserviceService,
    private users: UserMasterService, private dialog: MatDialog,
    toster: ToastrService) {
    super(toster)
    this.createForm();
  }
  createForm() {
    this.uploadForm = this.fb.group({
      file: [null, Validators.required],
      CompnayTypeId: ['', Validators.required],
      ddlKYCTypeId: ['', Validators.required],
      DocumentNo: ['']
    });
  }
  OnChangeCompany(event: any) {

    this.mstdataservice.KycTypeList(this.selectedValueCom, "1").subscribe({
      next: (data) => {
        this.kyctypeList = data.Result;
      }
    })
  }
  getdallKycData() {
    this.users.ListUserKYC().subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
      }
    })
  }
  AddNew() {
    this.addnew = true;
  }
  ngOnInit(): void {
    this.selectedValueCom = "0";
    this.selectedvaluekyc = "0";
    this.mstdataservice.GetAllCompanyTypeMaster().subscribe({
      next: (data) => {
        this.companyData = data.Result;
      }
    });
    this.getdallKycData();

    this.ngxs.show();

    setTimeout(() => {
      this.ngxs.hide();
    }, 5000);
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.uploadForm.patchValue({
        file: this.selectedFile
      });
    }
  }
  getDefaultHeaderFiles(): HttpHeaders {
    let userToken = sessionStorage.getItem("UserToken");
    let headers = new HttpHeaders();
    headers = headers.set("Access-Control-Allow-Origin", "*");
    headers = headers.set("APIToken", environment.APIToken);
    headers = headers.set("UserToken", userToken || '');
    return headers;
  }
  onSubmit(): void {
    if (this.uploadForm.invalid || !this.selectedFile) {
      this.showToaster(2, "No file Selected", "API Manager");
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);


    let headers: HttpHeaders = this.getDefaultHeaderFiles();
    this.hhtp.post(environment.baseurl + "/User/UploadUserKYC?kycTypeId=" + this.selectedvaluekyc + "&DocumentNo=" + this.uploadForm.get("DocumentNo")?.value, formData, { headers: headers }).subscribe({
      next: (response) => {
        this.getdallKycData();
        this.showToaster(1, "KYC has been Succesfully Uploaded", "API Manager")
      },
      error: (error) => {
        this.showToaster(3, "Uplod error" + error, "API Manager")

      }
    });
  }

  OpenModel=(UserKYCID:any)=>{
    
    const dialogRef = this.dialog.open(ViewDocumentComponent, {
      width: '600px',
      height:'600px',
      backdropClass:'popupBackdropClass',
      data:UserKYCID
    });
  
    
  }
  RemoveDocument() {
    
  }

}
