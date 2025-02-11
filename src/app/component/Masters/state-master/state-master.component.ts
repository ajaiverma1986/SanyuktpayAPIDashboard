import {  Component, OnInit } from '@angular/core';
import { MasterDataService } from '../../../services/master-data.service';
import {  StateListResponse } from '../../../RequestModel/MasterDataResponse';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-state-master',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule,MatProgressSpinnerModule],
  templateUrl: './state-master.component.html',
  styleUrl: './state-master.component.scss'
})
export class StateMasterComponent extends BasecomponentComponent implements OnInit {
  listdata:any;
  Modeldata!: StateListResponse[];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(private mstdataservice:MasterDataService,toast:ToastrService){
super(toast);
  }
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
