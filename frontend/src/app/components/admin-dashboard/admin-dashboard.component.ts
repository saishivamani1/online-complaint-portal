import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Complaint } from '../../models/complaint.model';

@Component({
  selector: 'app-admin-dash',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  complaints: Complaint[] = [];
  filterStatus = ''; filterCategory = '';
  saving: Record<string, boolean> = {};
  constructor(private api: ApiService) {}
  ngOnInit(){ this.load(); }
  load(){ this.api.allComplaints({ status: this.filterStatus, category: this.filterCategory }).subscribe(r => this.complaints = r); }
  updateStatus(c: Complaint, status: string){
    this.saving[c._id] = true;
    this.api.changeStatus(c._id, status).subscribe({
      next: (res) => { c.status = res.status; this.saving[c._id] = false; },
      error: () => { this.saving[c._id] = false; }
    });
  }


remove(id: string) {
  if (!confirm('Delete this complaint?')) return;
  this.api.deleteComplaint(id).subscribe({
    next: () => this.complaints = this.complaints.filter(x => x._id !== id),
    error: e => alert(e?.error?.message || 'Delete failed')
  });
}

}
