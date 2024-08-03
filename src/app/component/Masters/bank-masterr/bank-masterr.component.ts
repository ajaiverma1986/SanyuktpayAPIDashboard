import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms'
import { MasterDataService } from '../../../services/master-data.service';
import { SimpleResponse, BankListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-bank-masterr',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule],
  templateUrl: './bank-masterr.component.html',
  styleUrl: './bank-masterr.component.css'
})
export class BankMasterrComponent implements OnInit {

  listdata:any;
  Modeldata!: BankListResponse[];
  constructor(private mstdataservice:MasterDataService){}
  displayedColumns: string[] = ['BankID','BankName','StatusName',];
  dataSource = this.Modeldata;

  ngOnInit(): void {
    this.mstdataservice.BankList().subscribe({
      next:(SimpleResponse)=>{
        this.Modeldata=SimpleResponse.Result;
        console.log(this.Modeldata);
      }
    });
  }

}
