import {  Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms'
import { MasterDataService } from '../../../services/master-data.service';
import {  ListPaymentChanelResponse, ListPaymentModeResponse } from '../../../RequestModel/MasterDataResponse';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-payment-mode-master',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule,MatProgressSpinnerModule,MatInputModule,MatSelectModule,MatFormFieldModule,FormsModule,MatButtonModule,MatDivider],
  templateUrl: './payment-mode-master.component.html',
  styleUrl: './payment-mode-master.component.scss'
})
export class PaymentModeMasterComponent implements OnInit {
  listdata:any;
  Modeldata!: ListPaymentChanelResponse[];
  Modeldistrict!: ListPaymentModeResponse[];
  formgroup!:FormGroup;
  selectedValue!: string;

  constructor(private mstdataservice:MasterDataService,private formbuilder:FormBuilder){}
  displayedColumns: string[] = ['PaymentModeID','PaymentChanelName','PaymentModeName','StatusName'];
  dataSource = this.Modeldata;

 

  ngOnInit(): void {
    this.formgroup=this.formbuilder.group({
      district:['',Validators.required]
    });

    this.mstdataservice.ListPaymentChanel().subscribe({
      next:(SimpleResponse)=>{
        this.Modeldata=SimpleResponse.Result;

      }
    });
  }

  GetDistrict():void{
    this.mstdataservice.ListPaymentModes(this.selectedValue).subscribe({
      next:(SimpleResponse)=>{
        this.Modeldistrict=SimpleResponse.Result;

      }
    });
  }
}
