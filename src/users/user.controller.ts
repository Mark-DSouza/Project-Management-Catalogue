import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guards';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get()
  getMe(@GetUser() user: User) {
    return user;
  }
}
