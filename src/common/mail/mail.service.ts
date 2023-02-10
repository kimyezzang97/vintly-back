import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(email: string, code: string, id: string) {
    this.mailerService
      .sendMail({
        from: 'Vintly<jvintaged@naver.com>', // 보내는 분의 메일계정
        to: email, // 받는 분의 메일계정 (여러 개 가능)
        subject: '회원가입 인증 메일',
        text: 'Hello world?',
        html: `<html>
        <head>
          <title>mail 테스트</title>
          <script>
          </script>
        </head>
        <body>
          <h1>* 아래 버튼을 누르면 회원가입 인증이 완료됩니다! *</h1>
          <b>Hello world?${code}</b>
          <a href="http://localhost:5001/user/enable?id=${id}&code=${code}"> 메일인증
          <input type="button" class="btn" value="클릭하세용" 
          onclick="window.open('http://localhost:5001/user/enable?id=${id}&code=${code}')" />
        </body>
      </html>`,
      })
      .catch(() => {
        console.log('email fail');
      });
  }
}
