import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 'a',
      email: 'mia@server.com',
      password: 'mia',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(createUserDto: CreateUserDto) {
    const user = new UserEntity(createUserDto);
    await user.save();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
