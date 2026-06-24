import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
  stages: [
    { duration: '10s', target: 0   },
    { duration: '10s', target: 500 },
    { duration: '10s', target: 0   },
    { duration: '10s', target: 500 },
    { duration: '10s', target: 0   },
  ]
}
export default function() {
  const response = http.get('http://localhost:3000/login.html')

  check(response, {
    'page loaded successfully': (r) => r.status === 200,
    'response time under 3s': (r) => r.timings.duration < 3000,
  })

  sleep(1)
}