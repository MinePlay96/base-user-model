import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import * as bcrypt from 'bcrypt';
import { Role } from './Role';

const SALT_NUMBER = 10;

@Entity()
@ObjectType()
export class User extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field(() => String)
  @Column({ unique: true })
  public name: string;

  @Field(() => [Role])
  @JoinTable()
  @ManyToMany(() => Role, {
    cascade: true
  })
  public roles: Promise<Array<Role>>;

  @Column()
  public password: string;

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, SALT_NUMBER);
  }

  public async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }

}
