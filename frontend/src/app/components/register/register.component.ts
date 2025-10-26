import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  name=''; email=''; password=''; role='citizen'; error='';
  constructor(private api: ApiService, private router: Router) {}
  submit() {
    this.api.register({ name: this.name, email: this.email, password: this.password, role: this.role }).subscribe({
      next: (res) => {
        this.api.setToken(res.token);
        if (res.user?.name) localStorage.setItem('userName', res.user.name);
        if (res.user?.email) localStorage.setItem('userEmail', res.user.email);
        this.router.navigateByUrl('/');
      },
      error: (e) => this.error = e.error?.message || 'Registration failed'
    });
  }
}
