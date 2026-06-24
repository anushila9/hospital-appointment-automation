import http from 'k6/http' //make web requests (visit pages, send forms)
import { sleep, check } from 'k6' //verify the response, check whether the result is works

export const options = {
    vus: 1, //only one virtual user
    duration: '10s' //run the test for 10 secs
}

export default function () {
    const response = http.get('http://localhost:3000/login.html')
    check(response, {
        'page loaded successfully': (r) => r.status === 200, //checks if the server responded with no error
        'response time under 500ms': (r) => r.timings.duration < 500,
        
    })
    sleep(1)

}