import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-basecomponent',
  standalone: true,
  imports: [],
  templateUrl: './basecomponent.component.html',
  styleUrl: './basecomponent.component.scss'
})
export class BasecomponentComponent {

  constructor(private toast: ToastrService) {

  }

  showToaster(msgtype: number, messageData: string, messagetitle: string) {
    if (msgtype == 1) {
      this.toast.success(messageData, messagetitle, { positionClass: 'toast-top-center' });
    }
    else if (msgtype == 2) {
      this.toast.info(messageData, messagetitle, { positionClass: 'toast-top-right' });
    }
    else if (msgtype == 3) {
      this.toast.error(messageData, messagetitle, { positionClass: 'toast-top-right' });
    }
    else if (msgtype == 4) {
      this.toast.warning(messageData, messagetitle, { positionClass: 'toast-top-right' });
    }

  }
  public exportAsExcelFile(json: any[], excelFileName: string):void {
    console.log(json);
    const worksheet: XLSX.WorkSheet=XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook={Sheets:{'data1': worksheet }, SheetNames: ['data1']};
    const excelBuffer: any=XLSX.write(workbook,{bookType:'xlsx', type: 'array'});

    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob=new Blob([buffer], {type: EXCEL_TYPE });
    
    FileSaver.saveAs(data,fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
