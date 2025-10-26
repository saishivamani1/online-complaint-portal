import Complaint from '../models/Complaint.js';

export const createComplaint = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;
    const photo = req.file ? req.file.filename : undefined;
    const complaint = await Complaint.create({
      title, description, category, location, photo, citizen: req.user._id
    });
    res.status(201).json(complaint);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const myComplaints = async (req, res) => {
  try {
    const list = await Complaint.find({ citizen: req.user._id }).sort('-createdAt');
    res.json(list);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getAll = async (req, res) => {
  try {
    const { status, category } = req.query;
    const q = {};
    if (status) q.status = status;
    if (category) q.category = category;
    const list = await Complaint.find(q).populate('citizen', 'name email').sort('-createdAt');
    res.json(list);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getOne = async (req, res) => {
  try {
    const item = await Complaint.findById(req.params.id).populate('citizen', 'name email').populate('assignedTo', 'name email');
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const addUpdate = async (req, res) => {
  try {
    const { message } = req.body;
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { $push: { updates: { message, by: req.user._id } } },
      { new: true }
    );
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const changeStatus = async (req, res) => {
  try {
    const { status, assignedTo } = req.body;
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { $set: { status, assignedTo } },
      { new: true }
    );
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
};