import { Component, OnInit } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { FormBuilder } from '@angular/forms';
import { MasterDataService } from '../../../services/master-data.service';

@Component({
  selector: 'app-calculation-type',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule],
  templateUrl: './calculation-type.component.html',
  styleUrl: './calculation-type.component.scss'
})
export class CalculationTypeComponent implements OnInit {
  
  listdata:any;
  //Modeldata!: PlanMasterListResponse[];
  constructor(private frmbuilder:FormBuilder,private mstdataservice:MasterDataService){

  }
  displayedColumns: string[] = ['PlanID', 'StatusName', 'PlanName'];
  //dataSource = this.Modeldata;
   ngOnInit(): void {
  //   this.mstdataservice.GetallPlan().subscribe({
  //     next:(SimpleResponse)=>{
  //       this.listdata=SimpleResponse;
  //       this.Modeldata=this.listdata.Result;
  //     }
  //   });
  }
  
}
