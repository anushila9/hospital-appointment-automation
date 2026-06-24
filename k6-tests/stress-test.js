import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
  stages: [
    { duration: '30s', target: 50  },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 200 },
    { duration: '30s', target: 300 },
    { duration: '30s', target: 0   },
  ]
}

export default function() {
  const response = http.get('http://localhost:3000/login.html')

  check(response, {
    'page loaded successfully': (r) => r.status === 200,
    'response time under 2s': (r) => r.timings.duration < 2000,
  })

  sleep(1)
}