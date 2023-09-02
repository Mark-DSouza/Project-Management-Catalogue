import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guards';

@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get()
  getMe(@Req() request: Request) {
    return request.user;
  }
}
