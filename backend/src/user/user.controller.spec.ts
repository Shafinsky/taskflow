import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

class MockPrismaService {}

describe('UserController (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: PrismaService, useClass: MockPrismaService },
      ],
    }).compile();

    app = moduleRef.createNestApplication<INestApplication>();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('app should be defined', () => {
    expect(app).toBeDefined();
  });
});
