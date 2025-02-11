import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms'
import { MasterDataService } from '../../../services/master-data.service';
import {  UserTypeListResponse } from '../../../RequestModel/MasterDataResponse';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-user-type-master',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatPaginatorModule],
  templateUrl: './user-type-master.component.html',
  styleUrl: './user-type-master.component.scss'
})
export class UserTypeMasterComponent implements OnInit {
  frmcomtype!:FormGroup;
  listdata:any;
  Modeldata!: UserTypeListResponse[];


  constructor(private frmbuilder:FormBuilder,private mstdataservice:MasterDataService){

  }
  displayedColumns: string[] = ['UserTypeId', 'UserTypeName', 'StatusName'];
  dataSource = this.Modeldata;
  ngOnInit(): void {
  
    this.mstdataservice.UserTypeList().subscribe({
      next:(SimpleResponse)=>{
        this.listdata=SimpleResponse;
        this.Modeldata=this.listdata.Result;
      }
    });
  }
}
