import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JoinDto } from './model/user.join.dto';
import { MailService } from 'src/common/mail/mail.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
  ) {}

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
    // id 중복, 정규식 체크
    if (await this.chkIdJoin(joinParam)) {
      // pw name 체크
      if (await this.chkPwNameJoin(joinParam)) {
        // 닉네임 생일 체크
        if (await this.chkNickBirthJoin(joinParam)) {
          // 이메일 체크
          if (await this.chkEmailJoin(joinParam)) {
            if (
              joinParam.gender === 'M' ||
              joinParam.gender === 'W' ||
              joinParam.gender === 'U'
            ) {
              // 비밀번호 암호화
              joinParam.userPw = await bcrypt.hash(joinParam.userPw, 10);

              // 메일 발송
              const code = await this.joinEmail(joinParam.email);

              // 회원가입 처리
              return this.userRepository.createUser(joinParam);
            } else {
              throw new HttpException(
                '성별 양식이 맞지 않습니다.',
                HttpStatus.BAD_REQUEST,
              );
            }
          }
        }
      }
    }
  }

  // ID 체크
  async chkIdJoin(joinParam: JoinDto) {
    // id 중복 체크
    const chkId = await this.userRepository.getChkId(joinParam.userId);
    if (chkId != 0) {
      throw new HttpException('중복된 id가 존재합니다.', HttpStatus.CONFLICT);
    } else {
      // 정규식 체크
      const idFormat = /^[a-z]+[a-z0-9]{4,20}$/g;
      if (!idFormat.test(joinParam.userId)) {
        throw new HttpException(
          'ID 양식이 맞지 않습니다.',
          HttpStatus.BAD_REQUEST,
        );
      } else return true;
    }
  }

  // 비밀번호 이름 체크
  async chkPwNameJoin(joinParam: JoinDto) {
    // const pwFormat = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}/;
    const pwFormat =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (!pwFormat.test(joinParam.userPw)) {
      throw new HttpException(
        '비밀번호 양식이 맞지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const nameFormat = /(^[가-힣]{2,10}$)|(^[a-zA-Z]{2,20}$)/;
      if (!nameFormat.test(joinParam.userName)) {
        throw new HttpException(
          '이름 양식이 맞지 않습니다.',
          HttpStatus.BAD_REQUEST,
        );
      } else return true;
    }
  }

  // 닉네임, 생일 체크
  async chkNickBirthJoin(joinParam: JoinDto) {
    const nicknameFormat = /^[a-zA-Z가-힣0-9-_.]{1,15}$/;
    const birthFormat =
      /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (!nicknameFormat.test(joinParam.nickname)) {
      throw new HttpException(
        '닉네임 양식이 맞지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    } else if (!birthFormat.test(joinParam.birth)) {
      throw new HttpException(
        '생일 양식이 맞지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const nickname = await this.userRepository.getChkNickname(
        joinParam.nickname,
      );
      if (nickname != 0) {
        throw new HttpException(
          '중복된 nickname이 존재합니다.',
          HttpStatus.CONFLICT,
        );
      } else return true;
    }
  }

  // 이메일 중복확인, 형식 체크
  async chkEmailJoin(joinParam: JoinDto) {
    const emailFormat =
      /^([A-Za-z0-9_\.\-]{1,64})+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (!emailFormat.test(joinParam.email)) {
      throw new HttpException(
        '이메일 양식이 맞지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const email = await this.userRepository.getChkEmail(joinParam.email);
      if (0 != email) {
        throw new HttpException(
          '중복된 이메일이 존재합니다.',
          HttpStatus.CONFLICT,
        );
      } else return true;
    }
  }

  // 메일 발송
  async joinEmail(email: string) {
    // 암호 생성

    // 메일 발송
    await this.mailService.sendMail(joinParam.email);
  }
}
