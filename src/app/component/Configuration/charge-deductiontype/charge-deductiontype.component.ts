import { Component, OnInit } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { FormBuilder } from '@angular/forms';
import { ConfigService } from '../../../services/ApplicationServices/config.service';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';
import {  ChargedeductionTypeListResponse } from '../../../ResponseModel/ConfigurationResponse';

@Component({
  selector: 'app-charge-deductiontype',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule],
  templateUrl: './charge-deductiontype.component.html',
  styleUrl: './charge-deductiontype.component.scss'
})
export class ChargeDeductiontypeComponent extends BasecomponentComponent implements OnInit {
  Modeldata!:ChargedeductionTypeListResponse[];
 
  constructor(private frmbuilder:FormBuilder,private mstdataservice:ConfigService,toast:ToastrService){
super(toast);
  }
  displayedColumns: string[] = ['ChargeDeductionId', 'StatusName', 'ChargeDeductionType'];
  dataSource = this.Modeldata;
   
  ngOnInit(): void {
    this.mstdataservice.ListChargeDeductionType().subscribe({
      next:(SimpleResponse)=>{
        this.Modeldata=SimpleResponse.Result;
      }
    });
  }
}
