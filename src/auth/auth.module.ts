import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BcryptService],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: "clavepanadero",
      signOptions: { expiresIn: '7d' },
    }),
  ],
  exports: [AuthService, BcryptService],
})
export class AuthModule {}
