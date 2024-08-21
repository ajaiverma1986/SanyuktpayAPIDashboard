import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  username!:string;

  constructor(private router: Router){

  }

  ngOnInit(): void {
    this.username=sessionStorage.getItem("Display Name") || 'Sanyukt pay';
  }
  Logout()
  {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  
}
