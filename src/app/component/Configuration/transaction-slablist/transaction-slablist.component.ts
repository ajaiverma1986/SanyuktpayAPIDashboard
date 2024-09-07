import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { MasterDataService } from '../../../services/master-data.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatIcon, MatIconModule } from "@angular/material/icon"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import { agencyMasterResponse, PlanMasterListResponse, ServiceListResponse, serviceTypeListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { TransactionslabRequest } from '../../../RequestModel/ConfigRequest';
import { ConfigService } from '../../../services/ApplicationServices/config.service';
import { CalculationMasterResponse, SlabTypeListResponse, TransactionslabResponse } from '../../../ResponseModel/ConfigurationResponse';


@Component({
  selector: 'app-transaction-slablist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIcon, MatIconModule, MatPaginatorModule, NgbModule],
  templateUrl: './transaction-slablist.component.html',
  styleUrl: './transaction-slablist.component.scss'
})
export class TransactionSlablistComponent extends BasecomponentComponent implements OnInit {

  Modeldata!: TransactionslabResponse[];
  displayedColumns: string[] = ['SlabId','PlanName', 'AgencyName', 'ServiceName', 'CalculationTypeName', 'SlabTypeName', 'FromAmount', 'Toamount', 'CalculationValue', 'StatusName',];
  Model: TransactionslabRequest = new TransactionslabRequest();
  frmtxnslabsetuplist!: FormGroup;
  selectedvaluechanel!: string
  selectedvalueMode!: string
  selectedvalueService!: string
  AgencyData!: agencyMasterResponse[];
  serviceTypeData!: serviceTypeListResponse[];
  serviceData!: ServiceListResponse[];
  CalData!: CalculationMasterResponse[];
  SalbTypeData!: SlabTypeListResponse[];
  PlanData!:PlanMasterListResponse[];
  Statusval!: number;
  selectedFromDate: any;
  selectedToDate: any;
  Addnew: boolean = false;
  CalculationModelTypeId!: string;
  planmodel!: string;
  slabModel!:string ;
 


  constructor(private mds: MasterDataService, private fb: FormBuilder, private txnser: ConfigService, toast: ToastrService) {
    super(toast);
    this.createForm();
  }
  createForm() {
    this.frmtxnslabsetuplist = this.fb.group({
      AgencyID: [''],
      ServiceTypeId: [''],
      ServiceID: [''],
      CalculationType: [''],
      Amount: [''],
      SlabType: [''],
      PlanId:['']

    });
  }
  AddNewRequest() {
    this.Addnew = true;
  }
  ngOnInit(): void {
    this.selectedvaluechanel = "0";
    this.selectedvalueMode = "0";
    this.selectedvalueService = "0";
    this.CalculationModelTypeId = "0";
    this.slabModel="0";
    this.planmodel = "0";

    this.mds.AgencyList().subscribe({
      next: (data) => {
        this.AgencyData = data.Result;
      }
    });

    this.txnser.ListCalculationType().subscribe({
      next: (data) => {
        this.CalData = data.Result;
      }
    });

    this.txnser.ListSlabType().subscribe({
      next: (data) => {
        this.SalbTypeData = data.Result;
      }
    });

    this.txnser.ListPlan().subscribe({
      next: (data) => {
        this.PlanData = data.Result;
      }
    });
  }

  getPageData() {
    this.txnser.ListTransactionslab(this.Model).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
      }
    });
  }
  OnChangeAgency() {
    this.mds.ListServiceType(this.selectedvaluechanel).subscribe({
      next: (data1) => {
        this.serviceTypeData = data1.Result;
      }
    });
  }
  OnChangeServiceType() {
    this.mds.ListAllService(this.selectedvalueMode).subscribe({
      next: (data2) => {
        this.serviceData = data2.Result;

      }
    });
  }



  onSubmit() {
    this.Model.AgencyID = Number(this.frmtxnslabsetuplist.get("AgencyID")?.value);
    this.Model.ServiceID = Number(this.frmtxnslabsetuplist.get("ServiceID")?.value);
    this.Model.CalculationType = Number(this.frmtxnslabsetuplist.get("CalculationType")?.value);
    this.Model.Amount = Number(this.frmtxnslabsetuplist.get("Amount")?.value);
    this.Model.SlabType = Number(this.frmtxnslabsetuplist.get("SlabType")?.value);
    this.Model.PlanId = Number(this.frmtxnslabsetuplist.get("PlanId")?.value);

    this.txnser.ListTransactionslab(this.Model).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
      }
    });

  }

}
