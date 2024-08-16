import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms'
import { MasterDataService } from '../../../services/master-data.service';
import { SimpleResponse, LedgerTypeListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-ledger-type-master',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule],
  templateUrl: './ledger-type-master.component.html',
  styleUrl: './ledger-type-master.component.scss'
})
export class LedgerTypeMasterComponent implements OnInit {

  listdata:any;
  Modeldata!: LedgerTypeListResponse[];
  constructor(private mstdataservice:MasterDataService){}
  displayedColumns: string[] = ['LedgerTypeId','LedgerTypeName','StatusName'];
  dataSource = this.Modeldata;

  ngOnInit(): void {
    this.mstdataservice.ListLedegrType().subscribe({
      next:(SimpleResponse)=>{
        this.Modeldata=SimpleResponse.Result;
        console.log(this.Modeldata);
      }
    });
  }

}
