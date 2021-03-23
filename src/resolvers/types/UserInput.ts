import { InputType, Field } from 'type-graphql';

import { User } from '../../models/User';

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  public name: string;

  @Field(() => [String])
  public roleUUIDs: Array<string>;

  @Field()
  public password: string;
}
