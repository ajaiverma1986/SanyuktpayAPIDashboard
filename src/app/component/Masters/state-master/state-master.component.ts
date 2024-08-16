import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms'
import { MasterDataService } from '../../../services/master-data.service';
import { SimpleResponse, StateListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-state-master',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule,MatProgressSpinnerModule],
  templateUrl: './state-master.component.html',
  styleUrl: './state-master.component.scss'
})
export class StateMasterComponent implements OnInit {
  listdata:any;
  Modeldata!: StateListResponse[];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(private mstdataservice:MasterDataService){}
  displayedColumns: string[] = ['StateID','StateCode','StateName',];
  dataSource = this.Modeldata;

 

  ngOnInit(): void {
    this.mstdataservice.StateList().subscribe({
      next:(SimpleResponse)=>{
        this.Modeldata=SimpleResponse.Result;

      }
    });
  }

}
