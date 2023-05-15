import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../modules/user/dto/create-user.dto';

@Entity('user')
export class UserEntity extends BaseEntity {
  constructor(user?: CreateUserDto) {
    super();
    if (user) {
      this.email = user.email;
      this.password = user.password;
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, update: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @BeforeInsert()
  cryptPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
