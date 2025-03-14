const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // เพิ่มการนำเข้า CORS
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // เพิ่ม CORS middleware

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/petcare', {
    authSource: 'admin'
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Schema ของข้อมูล appointment
const appointmentSchema = new mongoose.Schema({
    service: String,
    branch: String,
    name: String,
    contact: String,
    surname: String,
    petName: String,
    breed: String,
    gender: String,
    age: String,
    birth: String,
    date: String,
    time: String,
    doctor: { type: String, default: 'Dr. Sara' }, // ตั้งค่า Dr. Sara เป็นค่าเริ่มต้น
    status: { type: String, default: 'Pending' } // ตั้งค่า Pending เป็นค่าเริ่มต้น
});

const Appointment = mongoose.model('Appointment', appointmentSchema, 'appointments'); // Specify collection name 'appointments'

// POST route to save appointment data
app.post('/api/appointments', async (req, res) => {
    try {
        console.log('Received appointment data:', req.body); // Debug line
        const appointment = new Appointment(req.body);
        await appointment.save();
        console.log('Appointment saved:', appointment); // Debug line
        res.status(201).send(appointment);
    } catch (error) {
        console.error('Error saving appointment:', error);
        res.status(400).send({ error: 'Failed to save appointment', details: error });
    }
});

// PUT route to update appointment data
app.put('/api/appointments/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!appointment) {
            return res.status(404).send({ error: 'Appointment not found' });
        }
        console.log('Appointment updated:', appointment); // Debug line
        res.status(200).send(appointment);
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(400).send({ error: 'Failed to update appointment', details: error });
    }
});

// GET route to retrieve appointment data
app.get('/api/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find(); // ดึงข้อมูลทั้งหมด
        res.status(200).send(appointments);
    } catch (error) {
        console.error('Error retrieving appointments:', error);
        res.status(404).send({ error: 'Appointments not found', details: error });
    }
});

// GET route to retrieve a single appointment by ID
app.get('/api/appointments/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).send({ error: 'Appointment not found' });
        }
        res.status(200).send(appointment);
    } catch (error) {
        console.error('Error retrieving appointment:', error);
        res.status(404).send({ error: 'Appointment not found', details: error });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});