import { Component } from '@angular/core';
import { NavHeaderComponent } from "../component/common/nav-header/nav-header.component";
import { FooterComponent } from "../component/common/footer/footer.component";

@Component({
  selector: 'app-page-nofound',
  standalone: true,
  imports: [NavHeaderComponent, FooterComponent],
  templateUrl: './page-nofound.component.html',
  styleUrl: './page-nofound.component.scss'
})
export class PageNofoundComponent {

}
