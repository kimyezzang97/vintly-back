import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import { JoinDto } from './model/user.join.dto';
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // id 중복 체크
  async getChkId(id: string): Promise<number> {
    return await this.usersRepository.count({ where: { userId: id } });
  }

  // email 중복 체크
  async getChkEmail(chkEmail: string): Promise<number> {
    return await this.usersRepository.count({ where: { email: chkEmail } });
  }

  // 회원가입 처리
  async createUser(joinParam: JoinDto): Promise<void> {
    try {
      await this.usersRepository.save(joinParam);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: '회원가입 중 오류가 발생하였습니다.',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  // 회원1명 정보 가져오기
  async getUserInfo(paramID: string) {
    try {
      return await this.usersRepository.findOne({
        where: { userId: paramID },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: '이메일 인증 - 회원정보 가져오는 중 오류 발생',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  // 이메일 인증 후 업데이트 처리
  async enableUser(paramId: string) {
    try {
      return await this.usersRepository.update(
        {
          userId: paramId,
        },
        {
          useYn: 'Y',
        },
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: '이메일 인증 후 업데이트 중 오류 발생',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
