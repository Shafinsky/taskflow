import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;

  const prismaMock = {
    user: {
      create: jest.fn().mockResolvedValue({
        id: 1,
        email: 'test@mail.com',
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get(UserService);
  });

  it('should create user', async () => {
    const user = await service.create({
      email: 'test@mail.com',
      password: '123456',
      fullName: 'Test User',
    });

    expect(user.email).toBe('test@mail.com');
  });
});
