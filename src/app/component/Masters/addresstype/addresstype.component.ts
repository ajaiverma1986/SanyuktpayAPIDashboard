import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms'
import { MasterDataService } from '../../../services/master-data.service';
import { SimpleResponse, AddressTypeListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-addresstype',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule],
  templateUrl: './addresstype.component.html',
  styleUrl: './addresstype.component.css'
})
export class AddresstypeComponent implements OnInit {

  listdata:any;
  Modeldata!: AddressTypeListResponse[];
  constructor(private mstdataservice:MasterDataService){}
  displayedColumns: string[] = ['AddressTypeId','AddressTypeName','StatusName',];
  dataSource = this.Modeldata;

  ngOnInit(): void {
    this.mstdataservice.AdressTypeList().subscribe({
      next:(SimpleResponse)=>{
        this.Modeldata=SimpleResponse.Result;
        console.log(this.Modeldata);
      }
    });
  }


}
