import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  create() {
    return this.service.create('integration@test.com');
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
