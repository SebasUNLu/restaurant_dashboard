import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './TypeOrm/user.entity';
import { Repository } from 'typeorm';
import { hashPass } from 'src/bcrypt';
import { hash } from 'crypto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly bcryptService: BcryptService,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async createOne(name: string, email: string, password: string) {
    const hashedPass = await this.bcryptService.hashPassword(password);
    const newUser = this.usersRepository.create({
      email,
      name,
      password: hashedPass,
      roles: ["admin"]
    });
    return this.usersRepository.save(newUser);
  }

  deleteOne(id: number) {
    this.usersRepository.delete(id);
  }
}
