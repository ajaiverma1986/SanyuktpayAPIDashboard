import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { MasterDataService } from '../../../services/master-data.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, formatDate } from '@angular/common'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatIcon, MatIconModule } from "@angular/material/icon"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatPaginatorModule} from '@angular/material/paginator';
import { agencyMasterResponse, ServiceListResponse, serviceTypeListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {  TopupChargeRequest } from '../../../RequestModel/ConfigRequest';
import { ConfigService } from '../../../services/ApplicationServices/config.service';
import { CalculationMasterResponse, PlanMasterListDataResponse, SlabTypeListResponse, TopupChargeResponse } from '../../../ResponseModel/ConfigurationResponse';


@Component({
  selector: 'app-topup-charge-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIcon, MatIconModule, MatPaginatorModule, NgbModule],
  templateUrl: './topup-charge-list.component.html',
  styleUrl: './topup-charge-list.component.scss'
})
export class TopupChargeListComponent extends BasecomponentComponent implements OnInit {
  Modeldata!:TopupChargeResponse[];
  displayedColumns: string[] = ['TopupChargeId','SlabTypeName','CalculationTypeName','FromAmount','Toamount','CalculationValue','StatusName',];
  Model:TopupChargeRequest=new TopupChargeRequest();
  frmCommdis!:FormGroup;
  selectedvaluechanel!:string
  selectedvalueMode!:string
  selectedvalueService!:string
  AgencyData!:SlabTypeListResponse[];
  serviceTypeData!:serviceTypeListResponse[];
  serviceData!:ServiceListResponse[];
  CalData!:CalculationMasterResponse[];
  planData!:PlanMasterListDataResponse[];
  Statusval!:number;
  selectedFromDate:any;
  selectedToDate:any;
  Addnew:boolean=false;
  CalculationModelTypeId!:string;
  planmodel!:string;
  

  constructor(private mds: MasterDataService, private fb: FormBuilder,private txnser: ConfigService,toast: ToastrService) {
    super(toast);
    this.createForm();
  }
  createForm() {
    this.frmCommdis = this.fb.group({
      CalculationTypeId: [''],
      SlabTypeId: [''],
      TopupChargeId: [''],
      Amount: ['']
    });
  }
  AddNewRequest(){
    this.Addnew=true;
  }
  ngOnInit(): void {
    this.selectedvalueMode="0";
    this.CalculationModelTypeId="0";
    this.planmodel="0";
  
    this.txnser.ListCalculationType().subscribe({
next:(data)=>{
this.CalData=data.Result;
}
    });

    this.txnser.ListSlabType().subscribe({
      next:(data)=>{
      this.AgencyData=data.Result;
      }
          });

        
  }
  getPageData()
  {
    this.txnser.ListTopupCharge(this.Model).subscribe({
      next:(data)=>{
this.Modeldata=data.Result;
      }
    });
  }
 
  onSubmit(){
    this.Model.CalculationTypeId=Number(this.frmCommdis.get("CalculationTypeId")?.value);
    this.Model.SlabTypeId=Number(this.frmCommdis.get("SlabTypeId")?.value);
    this.Model.TopupChargeId=Number(this.frmCommdis.get("TopupChargeId")?.value);
    this.Model.Amount=Number(this.frmCommdis.get("Amount")?.value);
    this.txnser.ListTopupCharge(this.Model).subscribe({
      next:(data)=>{
this.Modeldata=data.Result;
      }
    });

  }
}
