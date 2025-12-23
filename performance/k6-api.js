/* global __VU */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  http.get('http://localhost:3000/users');
  http.post(
    'http://localhost:3000/users',
    JSON.stringify({ email: `test${__VU}@test.com` }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  sleep(1);
}