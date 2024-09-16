import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../../../services/master-data.service';
import {  BankListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bank-masterr',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule],
  templateUrl: './bank-masterr.component.html',
  styleUrl: './bank-masterr.component.scss'
})
export class BankMasterrComponent extends BasecomponentComponent  implements OnInit {

  listdata:any;
  Modeldata!: BankListResponse[];
  constructor(private mstdataservice:MasterDataService,toast:ToastrService){
super(toast);
  }
  displayedColumns: string[] = ['BankID','BankName','StatusName',];
  dataSource = this.Modeldata;

  ngOnInit(): void {
    this.mstdataservice.BankList().subscribe({
      next:(SimpleResponse)=>{
        this.Modeldata=SimpleResponse.Result;
       
      }
    });
  }

}
