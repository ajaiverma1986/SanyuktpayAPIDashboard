import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms'
import { MasterDataService } from '../../../services/master-data.service';
import { SimpleResponse,PlanMasterListResponse, CompanyTypeMasterResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-payment-chanel',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule],
  templateUrl: './payment-chanel.component.html',
  styleUrl: './payment-chanel.component.scss'
})
export class PaymentChanelComponent implements OnInit {
  listdata:any;
  Modeldata!: CompanyTypeMasterResponse[];
  constructor(private mstdataservice:MasterDataService){}
  displayedColumns: string[] = ['PaymentChanelID','PaymentChanelName',];
  dataSource = this.Modeldata;

  ngOnInit(): void {
    this.mstdataservice.ListPaymentChanel().subscribe({
      next:(SimpleResponse)=>{
        this.Modeldata=SimpleResponse.Result;
       
      }
    });
  }
}
