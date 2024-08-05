import { Component, model, OnInit  } from '@angular/core';
import { MasterDataService } from '../../../services/master-data.service';
import { UserTypeListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CreateUserWithLogoRequest } from '../../../RequestModel/UserRequest';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';

@Component({
  selector: 'app-ponboarding',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ponboarding.component.html',
  styleUrl: './ponboarding.component.css'
})
export class PonboardingComponent implements OnInit {
  listdata:any;
  Modeldata!: UserTypeListResponse[];
  selectedValue!: string;
  frmOnboarding!:FormGroup;
  Model:CreateUserWithLogoRequest=new CreateUserWithLogoRequest();
  constructor(private mstdataservice:MasterDataService,private frmBuilder:FormBuilder,private users:UserMasterService){}

  ngOnInit(): void {
    this.selectedValue="0";
this.frmOnboarding=this.frmBuilder.group({
Usertype:[]
});
this.users.UserOnboarding(this.Model).subscribe({
  next:(SimpleResponse)=>{
    //this.Modeldata=SimpleResponse.Result;

  }
});
    this.mstdataservice.UserTypeList().subscribe({
      next:(SimpleResponse)=>{
        this.Modeldata=SimpleResponse.Result;
   
      }
    });
  }
  ChangeUserType():void
  {
   console.log(this.selectedValue);
  }


 
}
