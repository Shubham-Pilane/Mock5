const express = require('express');
const jwt = require('jsonwebtoken');
const {Doctor} = require('../models/doctorModel');

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  jwt.verify(token, 'masai', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Create a new doctor appointment
router.post('/appointments', verifyToken, async (req, res) => {
  const doctorData = req.body;
  try {
    const doctor = new Doctor(doctorData);
    await doctor.save();
    res.json({ message: 'Doctor appointment created' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Get all doctor appointments
router.get('/appointments', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Get a specific doctor appointment by ID
router.get('/appointments/:id', async (req, res) => {
  const doctorId = req.params.id;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Update a doctor appointment by ID
router.patch('/appointments/:id', async (req, res) => {
  const doctorId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updatedData, { new: true });
    if (!updatedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Delete a doctor appointment by ID
router.delete('/appointments/:id', async (req, res) => {
  const doctorId = req.params.id;
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
    if (!deletedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json({ message: 'Doctor appointment deleted' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Other doctor routes (search, filter, sort) can be added here

module.exports = router;

