import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Complaint } from '../models/complaint.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.api;
  private token: string | null = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  setToken(token: string) { this.token = token; localStorage.setItem('token', token); }
  clearToken() { this.token = null; localStorage.removeItem('token'); }

  private authHeaders(): HttpHeaders {
    let h = new HttpHeaders();
    if (this.token) h = h.set('Authorization', `Bearer ${this.token}`);
    return h;
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.base}/auth/login`, data);
  }
  register(data: { name: string; email: string; password: string; role?: string }): Observable<any> {
    return this.http.post(`${this.base}/auth/register`, data);
  }

  createComplaint(form: FormData): Observable<Complaint> {
    return this.http.post<Complaint>(`${this.base}/complaints`, form, { headers: this.authHeaders() });
  }
  myComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.base}/complaints/mine`, { headers: this.authHeaders() });
  }
  allComplaints(params?: any): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.base}/complaints`, { headers: this.authHeaders(), params });
  }
  getComplaint(id: string): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.base}/complaints/${id}`, { headers: this.authHeaders() });
  }
  addUpdate(id: string, message: string): Observable<Complaint> {
    return this.http.post<Complaint>(`${this.base}/complaints/${id}/updates`, { message }, { headers: this.authHeaders() });
  }
  changeStatus(id: string, status: string, assignedTo?: string): Observable<Complaint> {
    return this.http.patch<Complaint>(`${this.base}/complaints/${id}/status`, { status, assignedTo }, { headers: this.authHeaders() });
  }
  
  deleteComplaint(id: string) {
  return this.http.delete<{ message: string }>(
    `${this.base}/complaints/${id}`,
    { headers: this.authHeaders() }
  );
}


}
