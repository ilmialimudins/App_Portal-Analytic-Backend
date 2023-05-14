import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createUsers(@Body() body: any) {
    return body;
  }
}
