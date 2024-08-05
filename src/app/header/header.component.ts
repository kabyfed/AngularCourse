import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from 'src/app/interfaces/auth-user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }
  headerUser: AuthUser | null = null;

  ngOnInit(): void {
    this.headerUser = this.userService.getUser();
  }

  isDropdownOpen = false;

  isGuest(): boolean {
    return this.userService.getRole() === 'guest';
  }

  isAdmin(): boolean {
    return this.userService.getRole() === 'admin';
  }

  isUser(): boolean {
    return this.userService.getRole() === 'user';
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  logOut() {
    this.toggleDropdown();
    this.authService.logoutUser();
    this.router.navigateByUrl("/authorization");
  }
}
