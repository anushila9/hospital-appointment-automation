import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m',  target: 10 },
    { duration: '30s', target: 0  },
  ]
}

export default function() {

  // Test 1 — GET doctors list
  const doctorsRes = http.get('http://localhost:4000/api/doctors')
  check(doctorsRes, {
    'doctors list loaded': (r) => r.status === 200,
    'doctors response under 500ms': (r) => r.timings.duration < 500,
  })

  // Test 2 — POST login
  const loginPayload = JSON.stringify({
    email: 'patient@medicare.com',
    password: 'Test@1234'
  })

  const loginParams = {
    headers: { 'Content-Type': 'application/json' }
  }

  const loginRes = http.post(
    'http://localhost:4000/api/login',
    loginPayload,
    loginParams
  )

  check(loginRes, {
    'login successful': (r) => r.status === 200,
    'login response under 500ms': (r) => r.timings.duration < 500,
  })

  // Test 3 — POST appointment
  const appointmentPayload = JSON.stringify({
    doctorId: 1,
    date: '2026-07-15',
    reason: 'Regular checkup'
  })

  const appointmentRes = http.post(
    'http://localhost:4000/api/appointments',
    appointmentPayload,
    loginParams
  )

  check(appointmentRes, {
    'appointment booked': (r) => r.status === 201,
    'booking response under 500ms': (r) => r.timings.duration < 500,
  })

  

  sleep(1)
}