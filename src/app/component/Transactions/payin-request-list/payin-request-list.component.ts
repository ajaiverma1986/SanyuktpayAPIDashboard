import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { MasterDataService } from '../../../services/master-data.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, formatDate } from '@angular/common'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatIcon, MatIconModule } from "@angular/material/icon"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransactionsService } from '../../../services/ApplicationServices/transactions.service';
import { PayinRequestListResponse } from '../../../RequestModel/TransactionResponse';
import { ListPayinRequestRequest } from '../../../RequestModel/TransactionRequest';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { ListPaymentChanelResponse, ListPaymentModeResponse } from '../../../RequestModel/MasterDataResponse';
import { PayinRequestComponent } from "../payin-request/payin-request.component";
import { ViewTransactiondocComponent } from '../view-transactiondoc/view-transactiondoc.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-payin-request-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIcon, MatIconModule, MatPaginatorModule, NgbModule, PayinRequestComponent],
  templateUrl: './payin-request-list.component.html',
  styleUrl: './payin-request-list.component.scss'
})
export class PayinRequestListComponent extends BasecomponentComponent implements OnInit {

  Modeldata!:PayinRequestListResponse[];
  displayedColumns: string[] = ['RequestID','CreatedOn','DepositDate','PaymentChanelName','PaymentModeName','AccountName','AccountNo','RefNo1','RefNo2','RejectedReason','Remarks','StatusName','CreatedBy','UpdatedOn','UpdatedBy','actions',];
  Model:ListPayinRequestRequest=new ListPayinRequestRequest();
  frmgsearchpayin!:FormGroup;
  selectedvaluechanel!:string
  selectedvalueMode!:string
  payChnelData!:ListPaymentChanelResponse[];
  payModeData!:ListPaymentModeResponse[];
  Statusval!:number;
  selectedFromDate:any;
  selectedToDate:any;
  Addnew:boolean=false;
  

  length!:number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10,15, 25,50,100,500];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  constructor(private mds: MasterDataService, private fb: FormBuilder,private txnser: TransactionsService,toast: ToastrService, private dialog: MatDialog) {
    super(toast);
    this.createForm();
  }
  createForm() {
    this.frmgsearchpayin = this.fb.group({
      PaymentChanelID: [''],
      PaymentModeID: [''],
      Status: [''],
      FromDate: [''],
      ToDate: ['']
    });
  }
  AddNewRequest(){
    this.Addnew=true;
  }
  ngOnInit(): void {
    this.selectedvaluechanel="0";
    this.selectedvalueMode="0";
    const now = new Date();

this.selectedFromDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
this.selectedToDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};

    this.mds.ListPaymentChanel().subscribe({
next:(data)=>{
this.payChnelData=data.Result;
}
    });



    this.getPageData(1);
  }
  getPageData(pagenum:number)
  {
    this.Model.PageNo=pagenum;
    this.Model.PageSize=this.pageSize;
    this.txnser.ListPaymentResponse(this.Model).subscribe({
      next:(data)=>{
this.Modeldata=data.Result;
this.length=data.TotalRecords;
      }
    });
  }
  onchanelChange(){
    this.mds.ListPaymentModes(this.selectedvaluechanel).subscribe({
      next:(data1)=>{
        this.payModeData=data1.Result;
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getPageData(this.pageIndex+1);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onSubmit(){
    let val1 = (this.frmgsearchpayin.get("FromDate")?.value).year + "-" + (this.frmgsearchpayin.get("FromDate")?.value).month + "-" + (this.frmgsearchpayin.get("FromDate")?.value).day;
    let val2 = (this.frmgsearchpayin.get("ToDate")?.value).year + "-" + (this.frmgsearchpayin.get("ToDate")?.value).month + "-" + (this.frmgsearchpayin.get("ToDate")?.value).day;
    this.Model.FromDate=formatDate(val1, 'yyyy-MM-dd', 'en');
    this.Model.ToDate=formatDate(val2, 'yyyy-MM-dd', 'en');
    this.Model.PaymentChanelID=Number(this.frmgsearchpayin.get("PaymentChanelID")?.value);
    this.Model.PaymentModeId=Number(this.frmgsearchpayin.get("PaymentModeID")?.value);
    this.Model.Status=Number(this.frmgsearchpayin.get("Status")?.value);
    this.Model.PageNo=1;
    this.Model.PageSize=10;

    this.txnser.ListPaymentResponse(this.Model).subscribe({
      next:(data)=>{
this.Modeldata=data.Result;
this.length=data.TotalRecords;
      }
    });

  }

  
  OpenModel=(UserKYCID:any)=>{
    
    const dialogRef = this.dialog.open(ViewTransactiondocComponent, {
      width: '700px',
      height:'700px',
      backdropClass:'popupBackdropClass',
      data:{"UserKYCID":UserKYCID,"CallType":"1"}
    });
   
  }


}
