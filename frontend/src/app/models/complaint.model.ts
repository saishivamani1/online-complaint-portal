export interface ComplaintUpdate { message: string; at: string; by?: string; }
export type ComplaintStatus = 'submitted'|'in_progress'|'resolved'|'rejected';
export interface Complaint {
  _id: string;
  title: string;
  description: string;
  category: 'sanitation'|'roads'|'water'|'electricity'|'other';
  location?: string;
  photo?: string;
  status: ComplaintStatus;
  citizen: any;
  assignedTo?: any;
  updates: ComplaintUpdate[];
  createdAt: string;
}
