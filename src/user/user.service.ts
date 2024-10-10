import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './TypeOrm/user.entity';
import { Repository } from 'typeorm';
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

  async findOne(id: number): Promise<UserEntity | null> {
    let userFound = await this.usersRepository.findOneBy({ id });
    if (!userFound)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return userFound;
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
      roles: ['admin'],
    });
    return this.usersRepository.save(newUser);
  }

  deleteOne(id: number) {
    this.usersRepository.delete(id);
  }
}
