import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

// TODO: add init data

@Entity()
@ObjectType()
export class Right extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field(() => String)
  @Column({ unique: true })
  public name: string;
}
