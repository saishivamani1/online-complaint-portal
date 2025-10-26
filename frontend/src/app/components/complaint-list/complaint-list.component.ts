// src/app/components/complaint-list/complaint-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Complaint } from '../../models/complaint.model';

@Component({
  selector: 'app-complaint-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './complaint-list.component.html'
})
export class ComplaintListComponent implements OnInit {
  complaints: Complaint[] = [];
  userName = localStorage.getItem('userName') || '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.api.myComplaints().subscribe(r => (this.complaints = r));
  }

  open(c: Complaint) {
    this.router.navigate(['/complaints', c._id]);
  }

  // ⬇️ keep these INSIDE the class
  canDelete(c: any) {
    const myEmail = localStorage.getItem('userEmail');
    const role = localStorage.getItem('userRole');
    const isPrivileged = role === 'authority' || role === 'admin';

    // If your backend returns a populated user { email }, this works:
    if (c.user?.email) {
      return isPrivileged || c.user.email === myEmail;
    }

    // If backend returns just user id, compare to stored userId instead:
    const myId = localStorage.getItem('userId');
    if (typeof c.user === 'string') {
      return isPrivileged || c.user === myId;
    }

    return isPrivileged; // fallback
  }

  remove(id: string) {
    if (!confirm('Delete this complaint?')) return;
    this.api.deleteComplaint(id).subscribe({
      next: () => (this.complaints = this.complaints.filter(x => x._id !== id)),
      error: e => alert(e?.error?.message || 'Delete failed')
    });
  }
}
