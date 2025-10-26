import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn() { return !!localStorage.getItem('token'); }
  logout() { localStorage.removeItem('token'); location.href = '/login'; }
}
