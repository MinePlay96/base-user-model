import { InputType, Field } from 'type-graphql';

import { Role } from '../../models/Role';

@InputType()
export class RoleInput implements Partial<Role> {
  @Field()
  public name: string;

  @Field(() => [String])
  public rightUUIDs: Array<string>;
}
