import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  create(email: string) {
    return {
      id: 'test-id',
      email,
    };
  }

  findAll() {
    return [];
  }
}
