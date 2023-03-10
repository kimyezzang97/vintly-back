import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JoinDto } from './model/user.join.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // id 중복 체크
  @HttpCode(200)
  @Get('/id/:id')
  getChkId(@Param('id') id: string): Promise<number> {
    return this.userService.getChkId(id);
  }

  // email 중복 체크
  @HttpCode(200)
  @Get('/email/:email')
  getChkEmail(@Param('email') email: string): Promise<number> {
    return this.userService.getChkEmail(email);
  }

  // 회원가입처리
  @HttpCode(201)
  @Post('/')
  createUser(@Body() joinParam: JoinDto) {
    return this.userService.createUser(joinParam);
  }

  // 메일 인증 처리
  @HttpCode(200)
  @Get('/enable')
  enableUser(@Query() enableQuery) {
    const { id, code } = enableQuery;
    return this.userService.enableUser(id, code);
  }
}
