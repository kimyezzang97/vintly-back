import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '222.117.117.110',
      port: 3307,
      username: 'kyc',
      password: 'kyc1234',
      database: 'vintly',
      entities: [User],
      synchronize: false, // true일 경우 entity 수정시 db도 수정된다
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
