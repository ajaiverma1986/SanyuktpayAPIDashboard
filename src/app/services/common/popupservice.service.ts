import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ViewDocumentComponent} from '../../../../src/app/component/Onboarding/view-document/view-document.component'

@Injectable({
  providedIn: 'root'
})
export class PopupserviceService {

  constructor(private dialog: MatDialog) {}

  openPopup() {
    this.dialog.open(ViewDocumentComponent);
  }
}
