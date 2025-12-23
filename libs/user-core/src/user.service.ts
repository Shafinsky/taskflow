import type { UserRepository } from './user.repository';

export class UserServiceCore {
  constructor(private readonly repo: UserRepository) {}

  getAllUsers() {
    return this.repo.findAll();
  }

  getUserById(id: string) {
    return this.repo.findById(id);
  }

  createUser(email: string) {
    return this.repo.create({
      email,
      password: 'test-password',
      fullName: 'Test User',
    });
  }
}