import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { ActivatedRoute } from '@angular/router';
import { UserConfigurationResponse } from '../../../ResponseModel/UserResponse';
import { ChargedeductionTypeListResponse } from '../../../ResponseModel/ConfigurationResponse';
import { MasterDataService } from '../../../services/master-data.service';
import { ConfigService } from '../../../services/ApplicationServices/config.service';

@Component({
  selector: 'app-org-configuration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, MatIcon, MatIconModule],
  templateUrl: './org-configuration.component.html',
  styleUrl: './org-configuration.component.scss'
})
export class OrgConfigurationComponent extends BasecomponentComponent implements OnInit {
  Modeldata!: UserConfigurationResponse[];
  Frmorgdocchecker!: FormGroup;
  UserId!: number;
  Modeldatach!:ChargedeductionTypeListResponse[];
  selectedvalcrg!:string 

  constructor(private users: UserMasterService,private msts:ConfigService, toster: ToastrService, private fb: FormBuilder, private acrout: ActivatedRoute) {
    super(toster)
    this.createForm();

  }
  createForm() {
this.Frmorgdocchecker=this.fb.group({
MinamtTxn:[''],
MaxamtTxn:[],
Chargeddtype:[],
MaxPayinAmt:[]
});
  }
  ngOnInit(): void {
    this.selectedvalcrg="0";
    this.acrout.queryParams.subscribe(p => {
      this.UserId = p['UserId'];
    });

this.msts.ListChargeDeductionType().subscribe({
next:(data)=>{
  this.Modeldatach=data.Result;
}
});

    this.GetAllConfigrationData();
  }

  GetAllConfigrationData() {
    this.users.GetAllUserConfigration(this.UserId).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
       
          if(this.Modeldata.length>0){
    this.Frmorgdocchecker.setValue({
      MinamtTxn:this.Modeldata[0].MinTxn,
      MaxamtTxn:this.Modeldata[0].MaxTxn,
      MaxPayinAmt:this.Modeldata[0].MaxPayinAmount
    });
   }
   
      }
    })
  }
}
