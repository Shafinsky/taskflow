import type { UserRepository } from 'user-core';
import { PrismaService } from '../prisma/prisma.service';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.user.create({ data });
  }
}
