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
        html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>mail인증</title>
          </head>
          <body>
            <div
              width="700px"
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="padding: 30px 0 30px 0; background-color: rgb(249, 246, 246)"
            >
              <table
                align="center"
                width="600px"
                border="0"
                cellpadding="0"
                cellspacing="0"
                style="
                  padding: 30px 20px 30px 20px;
                  background-color: rgb(255, 255, 255);
                "
              >
                <tbody>
                  <tr>
                    <td style="padding: 20px 0 20px 0; text-align: center">
                      Vintly(로고)
                    </td>
                  </tr>
                  <tr>
                    <td style="border-bottom: 0.5px solid gray"></td>
                  </tr>
                  <tr>
                    <td style="padding: 30px 0 30px 0; font-size: 24px">
                      회원가입을 완료하기 위해 메일 인증을 해주세요.
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: 16px; line-height: 28px">
                      ${id}님 Vintly에 회원가입을 해주셔서 감사합니다.
                      <br />
                      본인인증을 위해 아래 버튼을 눌러주세요.
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 0 0 0"></td>
                  </tr>
                  <tr>
                    <td style="text-align: center; padding: 15px 19px">
                      <a
                        href="http://222.117.117.110:5001/user/enable?id=${id}&code=${code}"
                        style="
                          font-size: 16px;
                          background-color: rgb(200, 219, 190);
                          color: white;
                          padding: 6px;
                          border-radius: 5px;
                        "
                        >메일 인증</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 15px 0 0 0"></td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td style="border-bottom: 0.5px solid gray"></td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 0 0 0"></td>
                  </tr>
                  <tr>
                    <td>
                      기타 문의 사항이 있으실 경우 jvintaged@gamil.com(메일주소)로
                      문의주세요.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </body>
        </html>`,
      })
      .catch(() => {
        console.log('email fail');
      });
  }
}
