import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('user_id', ['userId'], { unique: true })
@Index('email', ['email'], { unique: true })
@Entity('user', { schema: 'vintly' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'idx', comment: 'pk 순서' })
  idx: number;

  @Column('varchar', {
    name: 'user_id',
    unique: true,
    comment: '사용자 ID',
    length: 50,
  })
  userId: string;

  @Column('varchar', { name: 'user_pw', comment: '사용자 PW', length: 100 })
  userPw: string;

  @Column('varchar', { name: 'user_name', comment: '사용자 이름', length: 30 })
  userName: string;

  @Column('date', { name: 'birth', comment: '생년월일' })
  birth: string;

  @Column('varchar', {
    name: 'email',
    unique: true,
    comment: '이메일',
    length: 255,
  })
  email: string;

  @Column('varchar', {
    name: 'phone',
    nullable: true,
    comment: '전화번호',
    length: 50,
  })
  phone: string | null;

  @Column('varchar', { name: 'addr', comment: '주소', length: 255 })
  addr: string;

  @Column('char', {
    name: 'gender',
    comment: '성별 M : 남자, W : 여자 , U : 알수없음',
    length: 1,
    default: () => "'U'",
  })
  gender: string;

  @Column('char', {
    name: 'use_yn',
    comment: '사용 유무 Y : 사용, N : 탈퇴 X : 추방, K : 이메일 인증 대기',
    length: 1,
    default: () => "'K'",
  })
  useYn: string;

  @Column('datetime', {
    name: 'reg_date',
    nullable: true,
    comment: '등록날짜',
    default: () => 'CURRENT_TIMESTAMP',
  })
  regDate: Date | null;

  @Column('datetime', {
    name: 'pw_date',
    nullable: true,
    comment: '비밀번호 변경 날짜',
    default: () => 'CURRENT_TIMESTAMP',
  })
  pwDate: Date | null;

  @Column('datetime', {
    name: 'del_date',
    nullable: true,
    comment: '삭제 날짜',
  })
  delDate: Date | null;

  @Column('varchar', {
    name: 'email_code',
    nullable: true,
    comment: '이메일 인증 번호',
    length: 10,
  })
  emailCode: string | null;

  @Column('datetime', {
    name: 'email_ex_date',
    nullable: true,
    comment: '이메일 만료 날짜',
    default: () => "'(current_timestamp() + interval 3 day)'",
  })
  emailExDate: Date | null;

  @Column('varchar', {
    name: 'phone_code',
    nullable: true,
    comment: '휴대폰 인증 번호',
    length: 10,
  })
  phoneCode: string | null;
}
