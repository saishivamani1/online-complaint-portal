import mongoose from 'mongoose';

const statusEnum = ['submitted', 'in_progress', 'resolved', 'rejected'];

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['sanitation', 'roads', 'water', 'electricity', 'other'], default: 'other' },
  location: { type: String },
  photo: { type: String }, // filename stored under /uploads
  status: { type: String, enum: statusEnum, default: 'submitted' },
  citizen: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updates: [{
    message: String,
    at: { type: Date, default: Date.now },
    by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }]
}, { timestamps: true });

export default mongoose.model('Complaint', complaintSchema);