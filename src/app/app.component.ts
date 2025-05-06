import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'PropertyConnectFrontend';

  isLoggedIn = false;
  isLoading = false;
  currentYear = new Date().getFullYear();

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.isLoggedIn = !!user;
    console.log(this.isLoggedIn)
  }

  // Allow other components to update login state
  setLoginState(state: boolean): void {
    this.isLoggedIn = state;
  }
}
