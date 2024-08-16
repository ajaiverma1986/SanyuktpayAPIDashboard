import { Component, HostListener } from '@angular/core';
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [],
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.scss'
})
export class NavHeaderComponent {
  hamburgerClass: boolean = false;

  screenHeight: any;
  screenWidth: any;
  constructor(private router:Router) {
   
}

ngOnInit(): void {

}

}
