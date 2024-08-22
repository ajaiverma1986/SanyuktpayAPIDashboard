import { Component, OnInit } from '@angular/core';
import {  CreateNewUserRequest, UserrListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-apiuser',
  standalone: true,
  imports: [MatTableModule,MatCardModule,ReactiveFormsModule,CommonModule],
  templateUrl: './create-apiuser.component.html',
  styleUrl: './create-apiuser.component.scss'
})
export class CreateAPIUserComponent extends BasecomponentComponent implements OnInit {
  listdata:any;
  Modeldata!: UserrListResponse[];
  appData!: UserrListResponse[];
  displayedColumns: string[] = ['UserMasterID','UserName','OrganisationName','UserType', 'DisplayName','EmailId','MobileNo',];
  dataSource = this.Modeldata;
  addnew:boolean=false;
  frmAddUser!:FormGroup;
  Model:CreateNewUserRequest=new CreateNewUserRequest();
  UserID!:string;

  constructor(private userser:UserMasterService,private fb:FormBuilder, toast:ToastrService){
    super(toast);
    this.createForm();
  }
  ngOnInit(): void {
    this.getAllAppData();
  }
  getAllAppData(){
    this.userser.ListUsers().subscribe({
      next:(data)=>{
        this.Modeldata=data.Result;
        
      }
    });
  }
  AddNewApplication(){
this.addnew=true;
  }
  
  OnSubmit(){

    
  }
  createForm() {
    this.frmAddUser = this.fb.group({
      ApplicationName: ['', Validators.required],
      ApplicationDescription: ['', ],
      
    });
  }
}
