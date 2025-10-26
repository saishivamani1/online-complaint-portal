import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './complaint-form.component.html'
})
export class ComplaintFormComponent {
  title=''; description=''; category='other'; location=''; file?: File; error='';
  constructor(private api: ApiService, private router: Router) {}
  onFile(e: any) { this.file = e.target.files[0]; }
  submit() {
    const fd = new FormData();
    fd.append('title', this.title);
    fd.append('description', this.description);
    fd.append('category', this.category);
    fd.append('location', this.location);
    if (this.file) fd.append('photo', this.file);
    this.api.createComplaint(fd).subscribe({
      next: (c: any) => this.router.navigate(['/complaints', c._id]),
      error: (e) => this.error = e.error?.message || 'Failed to submit'
    });
  }
}
