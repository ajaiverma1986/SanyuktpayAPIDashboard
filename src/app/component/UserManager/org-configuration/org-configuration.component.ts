import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { ActivatedRoute, Router } from '@angular/router';
import { UserConfigurationResponse } from '../../../ResponseModel/UserResponse';
import { ChargedeductionTypeListResponse, PlanMasterListDataResponse } from '../../../ResponseModel/ConfigurationResponse';
import { ConfigService } from '../../../services/ApplicationServices/config.service';
import { UserConfigurationRequest } from '../../../RequestModel/UserRequest';


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
  Modeldatach!: ChargedeductionTypeListResponse[];
  selectedvalcrg!: number
  selectedPlan!: number
  selectedsame!: number;
  PlanModel!: PlanMasterListDataResponse[];
  Model: UserConfigurationRequest = new UserConfigurationRequest();
  UserIdnew!: number;

  constructor(private users: UserMasterService, private rout: Router, private msts: ConfigService, toster: ToastrService, private fb: FormBuilder, private acrout: ActivatedRoute) {
    super(toster)
    this.createForm();

  }
  createForm() {
    this.Frmorgdocchecker = this.fb.group({
      MinamtTxn: [],
      MaxamtTxn: [],
      Chargeddtype: [],
      MaxPayinAmt: [],
      MaxPayincount: [],
      PlanId: [],
      spayinamount: []
    });
  }
  ngOnInit(): void {
    this.selectedvalcrg = 0;
    this.selectedPlan = 0;
    this.selectedsame = 0;
    this.acrout.queryParams.subscribe(p => {
      this.UserId = p['UserId'];
    });

    this.msts.ListChargeDeductionType().subscribe({
      next: (data) => {
        this.Modeldatach = data.Result;
      }
    });

    this.msts.ListPlan().subscribe({
      next: (data) => {
        this.PlanModel = data.Result;
      }
    });

    this.GetAllConfigrationData();
  }
  BacktoPre() {
    this.rout.navigate(["/Dashboard/Orglistcmp"]);
  }
  GetAllConfigrationData() {
    this.users.GetAllUserConfigration(this.UserId).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;

        if (this.Modeldata.length > 0) {
          this.selectedPlan = this.Modeldata[0].PlanId;
          this.selectedvalcrg = this.Modeldata[0].ChargeTypeOn;
          this.Frmorgdocchecker.setValue({
            MinamtTxn: this.Modeldata[0].MinTxn,
            MaxamtTxn: this.Modeldata[0].MaxTxn,
            MaxPayinAmt: this.Modeldata[0].MaxPayinAmount,
            MaxPayincount: this.Modeldata[0].MaxNoOfCountPayin,
            PlanId: this.Modeldata[0].PlanId,
            Chargeddtype: this.Modeldata[0].ChargeTypeOn,
            spayinamount: this.Modeldata[0].SameAmountPayinAllowed
          });
        }
      }
    })
  }
  OnSubmit() {
    this.Model.ChargeTypeOn = Number(this.Frmorgdocchecker.get("Chargeddtype")?.value);
    this.Model.MaxNoOfCountPayin = Number(this.Frmorgdocchecker.get("MaxPayincount")?.value);
    this.Model.MaxTxn = Number(this.Frmorgdocchecker.get("MaxamtTxn")?.value);
    this.Model.MinTxn = Number(this.Frmorgdocchecker.get("MinamtTxn")?.value);
    this.Model.PlanId = Number(this.Frmorgdocchecker.get("PlanId")?.value);
    this.Model.SameAmountPayinAllowed = Number(this.Frmorgdocchecker.get("spayinamount")?.value);
    this.Model.MaxPayinAmount = Number(this.Frmorgdocchecker.get("MaxPayinAmt")?.value);
    this.Model.UserId = Number(this.UserId);

    this.users.UpdateUserconfiguration(this.Model).subscribe({
      next: (data) => {
        this.UserIdnew = data.Result.Result;
       
        if (this.UserIdnew > 0) {
          this.showToaster(1, "Configuration Updated", "Organisation Manager");
          this.rout.navigate(["/Dashboard/Orglistcmp"]);
        }
        else {
          this.showToaster(3, "Configuration Not Updated", "Organisation Manager");
        }
      }
    });
  }
}
