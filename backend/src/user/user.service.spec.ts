import { UserService } from './user.service';

describe('UserService (unit)', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  it('should create a user', () => {
    const user = service.create('test@mail.com');

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('test@mail.com');
  });

  it('should return empty users list', () => {
    expect(service.findAll()).toEqual([]);
  });
});
