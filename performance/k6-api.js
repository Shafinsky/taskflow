/* eslint-disable no-undef */

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // virtual users
  duration: '30s',
};

export default function () {
  const res = http.get('https://taskflow-backend-latest.onrender.com/users');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}