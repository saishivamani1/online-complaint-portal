import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Complaint } from '../../models/complaint.model';

@Component({
  selector: 'app-complaint-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complaint-detail.component.html'
})
export class ComplaintDetailComponent implements OnInit {
  c?: Complaint;
  id = ''; message='';
  constructor(private route: ActivatedRoute, private api: ApiService) {}
  ngOnInit(){ this.id = this.route.snapshot.params['id']; this.refresh(); }
  refresh(){ this.api.getComplaint(this.id).subscribe(r => this.c = r); }
}
