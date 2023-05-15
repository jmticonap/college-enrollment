import { Injectable } from '@nestjs/common';

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
}
