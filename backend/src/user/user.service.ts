import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserServiceCore } from 'user-core';
import { PrismaUserRepository } from './prisma-user.repository';

@Injectable()
export class UserService {
  private core: UserServiceCore;

  constructor(prisma: PrismaService) {
    this.core = new UserServiceCore(new PrismaUserRepository(prisma));
  }

  findAll() {
    return this.core.getAllUsers();
  }

  findOne(id: string) {
    return this.core.getUserById(id);
  }

  create(email: string) {
    return this.core.createUser(email);
  }
}
