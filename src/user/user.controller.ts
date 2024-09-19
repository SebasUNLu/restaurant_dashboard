import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './Dtos/create';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/enum';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  async getAllUsers() {
    return this.service.findAll();
  }

  @Get("secret")
  @Roles(Role.Admin)
  getSecret() {
    return {
      message: 'you did it',
    };
  }

  @Post()
  async createUser(@Body() { name, email, password }: CreateUserDto) {
    return this.service.createOne(name, email, password);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    this.service.deleteOne(id);
  }
}
