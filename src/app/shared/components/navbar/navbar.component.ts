import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MegaMenuModule } from 'primeng/megamenu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(protected authService: AuthService, private router: Router) {}
  isadminFlag: boolean = false;
  loggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((res) => {
      this.isadminFlag = res;
    });

    this.authService.loggedInSubject$.asObservable().subscribe((res) => {
      this.loggedIn = res;
    });
  }
  role: string = '';

  // isAdmin(): void {
  //   console.log('isadmin')
  //   this.role = localStorage.getItem('role') ?? '';
  //   if(this.role === 'Admin'){

  //   }
  //   else{
  //     this.admin=false
  //   }

  // }

  onlogOut() {
    localStorage.clear();
    this.authService.loggedInSubject$.next(false);
    this.router.navigate(['login']);
  }
}
