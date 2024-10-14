import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BcryptService],
  imports: [UserModule, JwtModule.registerAsync(jwtConfig)],
  exports: [AuthService, BcryptService, JwtModule],
})
export class AuthModule {}
