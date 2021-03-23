import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Authorized
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Role } from '../models/Role';
import { RoleInput } from './types/RoleInput';

@Resolver()
export class RoleResolver {

  @Query(() => [Role])
  @Authorized('listRoles')
  public async listRoles(): Promise<Array<Role>> {
    return Role.find();
  }

  @Query(() => Role, { nullable: true })
  @Authorized('showRole')
  public async showRole(@Arg('id') id: string): Promise<Role | undefined> {
    return Role.findOne({ where: { id } });
  }

  @Mutation(() => Role)
  @Authorized('createRole')
  public async createRole(@Arg('data') roleInput: RoleInput): Promise<Role> {
    const role = Role.create(roleInput).save();

    await getConnection()
      .createQueryBuilder()
      .relation(Role, 'rights')
      .of(role)
      .add(roleInput.rightUUIDs);

    return role;
  }
}
