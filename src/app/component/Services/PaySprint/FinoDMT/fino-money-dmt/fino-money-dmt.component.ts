import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../../../basecomponent/basecomponent.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FinoDMTService } from '../../../../../services/PaysprintServcies/fino-dmt.service';
import { GetCustomerRequestView } from '../../../../../RequestModel/SpayModel/FinoDMTRequest';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-fino-money-dmt',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fino-money-dmt.component.html',
  styleUrl: './fino-money-dmt.component.scss'
})
export class FinoMoneyDMTComponent extends BasecomponentComponent implements OnInit {
  Usertoken!: string;
  CustModel: GetCustomerRequestView = new GetCustomerRequestView();
  frmVerifyCust!:FormGroup;
  strmsg!:string;

  constructor(private routs: Router, private dmt: FinoDMTService,private fb:FormBuilder, toster: ToastrService) {
    super(toster)
  }
  ngOnInit(): void {

    this.createForm();
    this.GenerateToken();
  
  }
   createForm() {
      this.frmVerifyCust = this.fb.group({
        MobileNo: ['', [Validators.required]],
      });
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
    this.CustModel.Mobile = this.frmVerifyCust.get("MobileNo")?.value;
    this.CustModel.TokenData = sessionStorage.getItem("PaySPTOKEN") || '';
    
    this.dmt.GetCustomerDetail(this.CustModel).subscribe({
      next: (result) => {

        this.strmsg=result.message || '';
        if(result.response_code=="1")
        {
this.showToaster(1,this.strmsg,"DMT")
        }
        else
        {
          this.showToaster(3,this.strmsg,"DMT")
        }
      }
    });
  }
  getInvalidControls() {
    const invalidControls = [];
    const controls = this.frmVerifyCust.controls;
    for (const name in controls) {
      if (controls[name].invalid && controls[name].touched) {
        invalidControls.push(name);
      }
    }
    return invalidControls;
  }
  onSubmit(){
    this.GetCustomerDetail();
  }
}
