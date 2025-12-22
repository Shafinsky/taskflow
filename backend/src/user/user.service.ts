import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  private prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(email: string) {
    return this.prisma.user.create({
      data: {
        email,
        password: 'test-password',
        fullName: 'Test User',
      },
    });
  }
}
