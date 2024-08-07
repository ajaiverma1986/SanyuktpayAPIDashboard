import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-basecomponent',
  standalone: true,
  imports: [],
  templateUrl: './basecomponent.component.html',
  styleUrl: './basecomponent.component.css'
})
export class BasecomponentComponent  {

constructor(private toast:ToastrService){

}
showToaster(msgtype:number, messageData:string,messagetitle:string) {
  if(msgtype==1)
  {
    this.toast.success(messageData, messagetitle);
  }
  else if(msgtype==2)
  {
    this.toast.info(messageData, messagetitle);
  }
  else if(msgtype==3)
    {
      this.toast.error(messageData, messagetitle);
    }
    else if(msgtype==4)
      {
        this.toast.warning(messageData, messagetitle);
      }
  
}
}
