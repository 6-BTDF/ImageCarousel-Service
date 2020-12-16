import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { check, sleep } from 'k6';

export const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '45s', target: 1 },
    { duration: '45s', target: 10 },
    { duration: '45s', target: 100 },
    { duration: '90s', target: 1000 },
    { duration: '3m', target: 1500 },
    { duration: '1ms', target: 0 },
  ],
  thresholds: {
    errors: ['rate<0.01'],
    http_req_duration: ['p(99)<50'], // threshold on a standard metric
  },
};

const random = (num, skew = 1) => Math.floor(Math.random() ** skew * num);

export default function () {
  const res = http.get(`http://localhost:3001/${random(10000000)}`);

  const result = check(res, {
    'status code MUST be 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
  sleep(1);
}

