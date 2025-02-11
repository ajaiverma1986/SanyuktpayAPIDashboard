import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../../../services/master-data.service';
import {  AddressTypeListResponse } from '../../../RequestModel/MasterDataResponse';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addresstype',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatCardModule],
  templateUrl: './addresstype.component.html',
  styleUrl: './addresstype.component.scss'
})
export class AddresstypeComponent extends BasecomponentComponent implements OnInit {

  listdata: any;
  Modeldata!: AddressTypeListResponse[];
  constructor(private mstdataservice: MasterDataService, toast: ToastrService) {
    super(toast);
  }
  displayedColumns: string[] = ['AddressTypeId', 'AddressTypeName', 'StatusName',];
  //displayedColumns: string[] = [];
  dataSource = this.Modeldata;

  ngOnInit(): void {
    this.mstdataservice.AdressTypeList().subscribe({
      next: (SimpleResponse) => {
        this.Modeldata = SimpleResponse.Result;
        //   for( let v in this.Modeldata[0]){
        //     this.displayedColumns.push(v);
        // }

      }
    });
  }


}
