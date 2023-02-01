import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JoinDto } from './model/user.join.dto';

import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // ID 중복확인
  getChkId(id: string): Promise<number> {
    return this.userRepository.getChkId(id);
  }

  // email 중복확인
  getChkEmail(email: string): Promise<number> {
    return this.userRepository.getChkEmail(email);
  }

  // 닉네임 중복확인
  getChkNickname(nickname: string): Promise<number> {
    return this.userRepository.getChkNickname(nickname);
  }
  // 회원가입
  async createUser(joinParam: JoinDto) {
    // id,email 중복 체크, 비밀번호 형식 체크
    if (await this.chkJoinConflict(joinParam)) {
      // 비밀번호, 이메일 형식 체크
      if (await this.chkJoinForm(joinParam)) {
        // 비밀번호 암호화
        joinParam.userPw = await bcrypt.hash(joinParam.userPw, 10);
        // 회원가입 처리
        return this.userRepository.createUser(joinParam);
      }
    }
  }

  // id, email, pw 체크 분리
  async chkJoinConflict(joinParam: JoinDto) {
    // id,email 중복 체크
    const chkId = await this.userRepository.getChkId(joinParam.userId);
    const chkEmail = await this.userRepository.getChkEmail(joinParam.email);

    if (chkId != 0) {
      throw new HttpException('중복된 id가 존재합니다.', HttpStatus.CONFLICT);
    } else if (chkEmail != 0) {
      throw new HttpException(
        '중복된 email이 존재합니다.',
        HttpStatus.CONFLICT,
      );
    } else return true;
  }

  // 비밀번호 ,이메일 형식 체크
  async chkJoinForm(joinParam: JoinDto) {
    // 비밀번호 특수문자, 8자 이상 20자 이하 체크
    const pwFormat = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}/;
    const emailFormat = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (!pwFormat.test(joinParam.userPw)) {
      throw new HttpException(
        '비밀번호 양식이 맞지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    } else if (!emailFormat.test(joinParam.email)) {
      throw new HttpException(
        '이메일 양식이 맞지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    } else return true;
  }
}
