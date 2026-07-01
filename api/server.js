const express = require('express')
const app = express()

app.use(express.json())

const users = [
  { email: 'patient@medicare.com', password: 'Test@1234', name: 'Test Patient' }
]

app.post('/api/login', (req, res) => {
  const { email, password } = req.body

  const user = users.find(u => u.email === email && u.password === password)

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  res.status(200).json({ message: 'Login successful', name: user.name })
})

const doctors = [
  { id: 1, name: 'Dr. Ram Sharma', department: 'Cardiology', experience: '15 years' },
  { id: 2, name: 'Dr. Sita Thapa', department: 'Neurology', experience: '12 years' },
  { id: 3, name: 'Dr. Hari Poudel', department: 'General Medicine', experience: '10 years' },
  { id: 4, name: 'Dr. Krishna KC', department: 'Orthopedic', experience: '8 years' },
  { id: 5, name: 'Dr. Maya Gurung', department: 'Pediatrics', experience: '9 years' },
]

app.get('/api/doctors', (req, res) => {
  res.status(200).json(doctors)
})


const appointments = []

app.post('/api/appointments', (req, res) => {
  const { doctorId, date, reason } = req.body

  if (!doctorId || !date || !reason) {
    return res.status(400).json({ message: 'Please fill in all fields.' })
  }

  const appointment = {
    id: appointments.length + 1,
    doctorId,
    date,
    reason,
    status: 'upcoming'
  }

  appointments.push(appointment)
  res.status(201).json({ message: 'Appointment booked successfully!', appointment })
})
app.listen(4000, () => {
  console.log('MediCare API running on http://localhost:4000')
})