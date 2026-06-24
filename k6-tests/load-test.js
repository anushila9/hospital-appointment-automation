import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
    stages: [
        { duration: '30s', target: 50 },
        { duration: '1m', target: 50 }, 
        { duration: '30s', target: 0}, 
    ]
}

export default function() {
    const response = http.get('http://localhost:3000/login.html')

    check(response, {
        'page loaded successfully': (r) => r.status === 200,
        'response time under 1s': (r) => r.timings.duration < 1000,
    })
    sleep (1)
}