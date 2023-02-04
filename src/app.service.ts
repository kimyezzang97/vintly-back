import { Injectable } from '@nestjs/common';
import { MailService } from './common/mail/mail.service';

@Injectable()
export class AppService {
  constructor(private mailService: MailService) {}
  getHello(): string {
    return 'Hello World!';
  }
}
