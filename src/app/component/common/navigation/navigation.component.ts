import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {

  constructor(){

  }

  ngOnInit(): void {
    
  }

  // logout() {
  //   this.internalLoginService.logout().subscribe({
  //     next: (response) => {
  //       this.destroySession();
  //       this.router.navigate(['shop', this.orgId, this.shopId,'login']);
  //     },
  //     error: (error) => {

  //     }
  //   });
  // }

}
