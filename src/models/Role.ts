import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Right } from './Right';

const DESCRIPTION_LENGTH = 250;

@Entity()
@ObjectType()
export class Role extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field(() => String)
  @Column({ unique: true })
  public name: string;

  @Field(() => String)
  @Column({ length: DESCRIPTION_LENGTH })
  public desctiption?: string;

  @Field(() => [Right])
  @JoinTable()
  @ManyToMany(() => Right, {
    cascade: true
  })
  public rights: Promise<Array<Right>>;

  // public async getRights(): Promise<Array<string>> {
  //   return (await this.rights).map()
  // }
}
