import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = ''; password = ''; error = '';
  constructor(private api: ApiService, private router: Router) {}
  submit() {
    this.api.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.api.setToken(res.token);
        if (res.user?.name) localStorage.setItem('userName', res.user.name);
        if (res.user?.email) localStorage.setItem('userEmail', res.user.email);
        this.router.navigateByUrl('/');
      },
      error: (e) => this.error = e.error?.message || 'Login failed'
    });
  }
}
