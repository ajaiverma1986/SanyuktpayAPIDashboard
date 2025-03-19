import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../../../basecomponent/basecomponent.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FinoDMTService } from '../../../../../services/PaysprintServcies/fino-dmt.service';
import { GetCustomerRequestView } from '../../../../../RequestModel/SpayModel/FinoDMTRequest';

@Component({
  selector: 'app-fino-money-dmt',
  standalone: true,
  imports: [],
  templateUrl: './fino-money-dmt.component.html',
  styleUrl: './fino-money-dmt.component.scss'
})
export class FinoMoneyDMTComponent extends BasecomponentComponent implements OnInit {
  Usertoken!: string;
  CustModel: GetCustomerRequestView = new GetCustomerRequestView();

  constructor(private routs: Router, private dmt: FinoDMTService, toster: ToastrService) {
    super(toster)
  }
  ngOnInit(): void {

    this.GenerateToken();
   
    this.GetCustomerDetail();
  }
  GenerateToken() {
    this.dmt.GenerateSPAYToken().subscribe({
      next: (data) => {
        this.Usertoken = data.Result;
        
        if (this.Usertoken != "") {
          sessionStorage.setItem("PaySPTOKEN", this.Usertoken);
        }
        else {
          this.Usertoken = "";
          sessionStorage.setItem("PaySPTOKEN", this.Usertoken);
        }
      }
    });
  }
  GetCustomerDetail() {
    this.CustModel.Mobile = "9716232890";
    this.CustModel.TokenData = sessionStorage.getItem("PaySPTOKEN") || '';
    
    this.dmt.GetCustomerDetail(this.CustModel).subscribe({
      next: (result) => {
        console.log(result);
      }
    });
  }
}
