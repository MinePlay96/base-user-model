import { UserInputError, ValidationError } from 'apollo-server';
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Authorized
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { admin as adminUserData } from '../initData/user';
import { User } from '../models/User';
import { UserInput } from './types/UserInput';

@Resolver()
export class UserResolver {

  @Query(() => [User])
  @Authorized('listUser')
  public async listUser(): Promise<Array<User>> {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  @Authorized('showUser')
  public async showUser(@Arg('id') id: string): Promise<User | undefined> {
    return User.findOne({ where: { id } });
  }

  @Mutation(() => User)
  @Authorized('createUser')
  public async createUser(@Arg('data') userInput: UserInput): Promise<User> {

    const user = await User.create(userInput).save();

    await getConnection()
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(user)
      .add(userInput.roleUUIDs);

    return user;
  }

  @Mutation(() => Boolean)
  @Authorized('deleteUser')
  public async deleteUser(@Arg('ids', () => [String]) ids: Array<string>): Promise<boolean> {

    if (ids.includes(adminUserData.id)) {
      throw new UserInputError('can`t delet the admin user');
    }

    const users = await User.findByIds(ids);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (users.length === 0) {
      throw new UserInputError('no user to delete found');
    }
    await Promise.all(users.map(async user => user.remove()));

    return true;
  }
}
