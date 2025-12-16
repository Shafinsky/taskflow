import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import type { Server } from 'http';

import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController (integration)', () => {
  let app: INestApplication;
  let server: Server;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    server = app.getHttpServer() as unknown as Server;
  });

  it('POST /users', async () => {
    const res = await request(server)
      .post('/users')
      .send({
        email: 'integration@test.com',
        password: '123456',
        fullName: 'Integration User',
      })
      .expect(201);

    const body = res.body as { email: string };
    expect(body.email).toBe('integration@test.com');
  });

  afterAll(async () => {
    await app.close();
  });
});
