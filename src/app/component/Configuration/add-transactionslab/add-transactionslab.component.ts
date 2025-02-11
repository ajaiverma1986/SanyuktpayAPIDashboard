import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { MasterDataService } from '../../../services/master-data.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'
import {  HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import {  agencyMasterResponse, PlanMasterListResponse, ServiceListResponse, serviceTypeListResponse } from '../../../RequestModel/MasterDataResponse';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import {  MatIconModule } from "@angular/material/icon"
import { ConfigService } from '../../../services/ApplicationServices/config.service';
import {  AddTxnslabRequest } from '../../../RequestModel/ConfigRequest';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CalculationMasterResponse, SlabTypeListResponse } from '../../../ResponseModel/ConfigurationResponse';

@Component({
  selector: 'app-add-transactionslab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIconModule, NgbModule],
  templateUrl: './add-transactionslab.component.html',
  styleUrl: './add-transactionslab.component.scss'
})
export class AddTransactionslabComponent extends BasecomponentComponent implements OnInit {

  frmtxnslabsetuu!: FormGroup
  selectedvaluechanel!: string
  selectedvalueMode!: string
  selectedvalueService!: string
  CalculationModelTypeId!: string;
  selectedplan!: string;
  slabModel!:string ;
  AgencyData!: agencyMasterResponse[];
  serviceTypeData!: serviceTypeListResponse[];
  serviceData!: ServiceListResponse[];
  CalData!: CalculationMasterResponse[];
  SalbTypeData!: SlabTypeListResponse[];
  PlanData!:PlanMasterListResponse[];
  Statusval!: number;
  OriginatorAccId!: string;
  benAccId!: string;
  Model:AddTxnslabRequest=new AddTxnslabRequest();
  RequestID!:number;

  constructor(private mds: MasterDataService, private fb: FormBuilder, private confg: ConfigService,private router:Router,
    toast: ToastrService) {
    super(toast);
    this.createForm();
  }

  ngOnInit(): void {
    this.selectedvaluechanel = "0";
    this.selectedvalueMode = "0";
    this.selectedvalueService = "0";
    this.CalculationModelTypeId = "0";
    this.slabModel="0";
    this.selectedplan = "0";

    this.mds.AgencyList().subscribe({
      next: (data) => {
        this.AgencyData = data.Result;
      }
    });

    this.confg.ListCalculationType().subscribe({
      next: (data) => {
        this.CalData = data.Result;
      }
    });

    this.confg.ListSlabType().subscribe({
      next: (data) => {
        this.SalbTypeData = data.Result;
      }
    });

    this.confg.ListPlan().subscribe({
      next: (data) => {
        this.PlanData = data.Result;
        console.log(this.PlanData);
      }
    });
  }
  createForm() {
    this.frmtxnslabsetuu = this.fb.group({
      AgencyID: [''],
      ServiceTypeId: [''],
      ServiceID: [''],
      CalculationType: [''],
      CalculationValue:[''],
      FromAmount: [''],
      ToAmount: [''],
      SlabType: [''],
      PlanId:['']

    });
  }

  getDefaultHeaderFiles(): HttpHeaders {
    let userToken = sessionStorage.getItem("UserToken");
    let headers = new HttpHeaders();
    headers = headers.set("Access-Control-Allow-Origin", "*");
    headers = headers.set("APIToken", environment.APIToken);
    headers = headers.set("UserToken", userToken || '');
    return headers;
  }
  onSubmit() {

    this.Model.AgencyID = Number(this.frmtxnslabsetuu.get("AgencyID")?.value);
    this.Model.ServiceID = Number(this.frmtxnslabsetuu.get("ServiceID")?.value);
    this.Model.CalculationType = Number(this.frmtxnslabsetuu.get("CalculationType")?.value);
    this.Model.CalculationValue = Number(this.frmtxnslabsetuu.get("CalculationValue")?.value);
    this.Model.FromAmount =Number( this.frmtxnslabsetuu.get("FromAmount")?.value);
    this.Model.ToAmount = Number(this.frmtxnslabsetuu.get("ToAmount")?.value);
    this.Model.SlabType=Number(this.frmtxnslabsetuu.get("SlabType")?.value);
    this.Model.PlanId=Number(this.frmtxnslabsetuu.get("PlanId")?.value);


    this.confg.AddNewTransactionSlab(this.Model).subscribe({
      next: (data) => {
        this.RequestID = data.Result;
        if (this.RequestID > 0) {
          this.frmtxnslabsetuu.reset();
         this.showToaster(1,"Record Saved successfully","API Manager");
        }
        else {
          this.showToaster(3, "Record Not  Saved", "API Manager");
        }
      }
    });
  }

  GoBackToPre(){
    this.router.navigate(['/Dashboard/txtslablist']);
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


}
