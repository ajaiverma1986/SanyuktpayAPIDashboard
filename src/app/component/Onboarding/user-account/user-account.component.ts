import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterDataService } from '../../../services/master-data.service';
import { BankListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { CommonModule } from '@angular/common';
import { CreateOriginatorAccountRequest } from '../../../RequestModel/UserRequest';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';


@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent extends BasecomponentComponent implements OnInit {
  listdata: any;
  BankData!: BankListResponse[];
  selectedValue!: string;
  frmAccounDeatil!: FormGroup;
  UserId!: number;
  Model:CreateOriginatorAccountRequest=new CreateOriginatorAccountRequest();



  constructor(private toasts: ToastrService, private frmBuilder: FormBuilder, private mstservice: MasterDataService,private users:UserMasterService) {
    super(toasts)
    this.createForm();
  }

  ngOnInit(): void {
this.selectedValue="0";
    this.mstservice.BankList().subscribe({
      next: (data) => {
        this.BankData = data.Result;
      }
    });
  }
  createForm() {
    this.frmAccounDeatil = this.frmBuilder.group({
      Bankname: ['', Validators.required],
      AccountNo: ['', Validators.required],
      AccountName: ['', Validators.required],
      Ifsccode: ['', Validators.required],
      BranchAddress: ['']
    });
  }
  OnboardingSubmit() {

    this.Model.accountName = this.frmAccounDeatil.get("AccountName")?.value;
    this.Model.accountNo = this.frmAccounDeatil.get("AccountNo")?.value;
    this.Model.bankId = Number(this.frmAccounDeatil.get("Bankname")?.value);
    this.Model.branchAddress = this.frmAccounDeatil.get("BranchAddress")?.value;
    this.Model.ifsccode = this.frmAccounDeatil.get("Ifsccode")?.value;
    this.Model.userId = 2;

    this.users.AddUserAccounts(this.Model).subscribe({
      next: (SimpleResponse) => {
        this.UserId = Number(SimpleResponse.Result);
        if (this.UserId > 0) {
          this.showToaster(1,"Record Saved Successfully","Partner Onboarding");
        }
        else
        {
          console.log(SimpleResponse);
          this.showToaster(3,"Record Not Saveed Successfully","Partner Onboarding");
        }

      }
    });
  }

}
