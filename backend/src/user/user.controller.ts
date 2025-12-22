import { Controller, Get, Post, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  create() {
    return this.service.create('test@test.com');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
