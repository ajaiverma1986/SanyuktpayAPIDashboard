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
import { PayinRequestListResponse } from '../../../RequestModel/TransactionResponse';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { agencyMasterResponse, ListPaymentChanelResponse, ListPaymentModeResponse, ServiceListResponse, serviceTypeListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { CommissionDistributionRequest } from '../../../RequestModel/ConfigRequest';
import { ConfigService } from '../../../services/ApplicationServices/config.service';
import { CalculationMasterResponse, CommissionDistributionResponse, PlanMasterListDataResponse } from '../../../ResponseModel/ConfigurationResponse';

@Component({
  selector: 'app-distribution-commission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIcon, MatIconModule, MatPaginatorModule, NgbModule],
  templateUrl: './distribution-commission.component.html',
  styleUrl: './distribution-commission.component.scss'
})
export class DistributionCommissionComponent extends BasecomponentComponent implements OnInit {
  Modeldata!:CommissionDistributionResponse[];
  displayedColumns: string[] = ['MarginConfigrationID','AgencyName','ServiceName','PlanName','CalculationTypeName','FromAmount','Toamount','CalculationValue','StatusName',];
  Model:CommissionDistributionRequest=new CommissionDistributionRequest();
  frmCommdis!:FormGroup;
  selectedvaluechanel!:string
  selectedvalueMode!:string
  selectedvalueService!:string
  AgencyData!:agencyMasterResponse[];
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
      AgencyId: [''],
      ServiceTypeId: [''],
      ServiceId: [''],
      CalculationTypeId: [''],
      amount: [''],
      PlanId: ['']
    });
  }
  AddNewRequest(){
    this.Addnew=true;
  }
  ngOnInit(): void {
    this.selectedvaluechanel="0";
    this.selectedvalueMode="0";
    this.selectedvalueService="0";
    this.CalculationModelTypeId="0";
    this.planmodel="0";
  
    this.mds.AgencyList().subscribe({
next:(data)=>{
this.AgencyData=data.Result;
}
    });

    this.txnser.ListCalculationType().subscribe({
      next:(data)=>{
      this.CalData=data.Result;
      }
          });

          this.txnser.ListPlan().subscribe({
            next:(data)=>{
            this.planData=data.Result;
            }
                });
  }
  getPageData()
  {
    this.txnser.ListCommissionDistribution(this.Model).subscribe({
      next:(data)=>{
this.Modeldata=data.Result;
      }
    });
  }
  OnChangeAgency(){
    this.mds.ListServiceType(this.selectedvaluechanel).subscribe({
      next:(data1)=>{
        this.serviceTypeData=data1.Result;
      }
    });
  }
  OnChangeServiceType(){
    this.mds.ListAllService(this.selectedvalueMode).subscribe({
      next:(data2)=>{
        this.serviceData=data2.Result;
       
      }
    });
  }

 

  onSubmit(){
    this.Model.AgencyId=Number(this.frmCommdis.get("AgencyId")?.value);
    this.Model.ServiceId=Number(this.frmCommdis.get("ServiceId")?.value);
    this.Model.CalculationTypeId=Number(this.frmCommdis.get("CalculationTypeId")?.value);
    this.Model.amount=Number(this.frmCommdis.get("amount")?.value);
    this.Model.PlanId=Number(this.frmCommdis.get("PlanId")?.value);
  
    this.txnser.ListCommissionDistribution(this.Model).subscribe({
      next:(data)=>{
this.Modeldata=data.Result;
      }
    });

  }

}
