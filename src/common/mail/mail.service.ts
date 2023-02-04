import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(email: string, code: number) {
    this.mailerService
      .sendMail({
        from: 'Vintly<jvintaged@naver.com>', // 보내는 분의 메일계정
        to: email, // 받는 분의 메일계정 (여러 개 가능)
        subject: '회원가입 인증 메일',
        text: 'Hello world?',
        html: `<b>Hello world?${code}</b>`,
      })
      .catch(() => {
        console.log('email fail');
      });
  }
}
