import { Injectable } from '@nestjs/common';
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

  // 닉네임 중복 체크
  async getChkNickname(chkNickname: string): Promise<number> {
    return await this.usersRepository.count({
      where: { nickname: chkNickname },
    });
  }

  // 회원가입 처리
  async createUser(joinParam: JoinDto): Promise<void> {
    await this.usersRepository.save(joinParam);
  }
}
