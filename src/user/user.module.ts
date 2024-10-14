import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './TypeOrm/user.entity';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/roles/roles.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  // Indica que repositorios fueron definidos para este módulo, y pueden ser inyectados directamente al servicio
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule],
  controllers: [UserController],
  providers: [
    UserService,
    BcryptService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  // Exports so that AuthService, and other modules, can use it
  exports: [UserService],
})
export class UserModule {}
