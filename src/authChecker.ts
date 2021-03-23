import { AuthenticationError } from 'apollo-server';
import { IncomingHttpHeaders } from 'http2';
import { AuthChecker } from 'type-graphql';
import { User } from './models/User';

export interface IContext {
  user: User;
}

export const authChecker: AuthChecker<IContext> = async({ context: { user } }, requierdRights) => {

  // get all roles from user / get only the names as array
  const userRoles = await user.roles;
  const userRights = new Set<string>();

  await Promise.all(userRoles.map(async role => {
    const rights = await role.rights;

    rights.forEach(right => {
      userRights.add(right.name);
    });
  }));

  // check if the requierd roles array contains a role of the user
  return requierdRights.some(requierdRight => userRights.has(requierdRight));
};

export async function context(req: {headers: IncomingHttpHeaders}): Promise<IContext> {

  const { username, password } = req.headers;

  if (typeof username !== 'string' || typeof password !== 'string') {
    throw new AuthenticationError('no credentials present requiers headers "username" and "password"');
  }

  const user = await User.findOne({
    relations: [ 'roles', 'roles.rights' ],
    where: { name: username }
  });

  if (!user || !await user.comparePassword(password)) {
    throw new AuthenticationError('wrong credentials');
  }

  return { user };
}
