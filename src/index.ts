import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { RoleResolver } from './resolvers/RoleResolver';
import { UserResolver } from './resolvers/UserResolver';
import { authChecker, context, IContext } from './authChecker';

const SERVER_PORT = 4000;

async function main(): Promise<void> {
  const connection = await createConnection();

  await connection.runMigrations();

  const schema = await buildSchema({
    authChecker,
    resolvers: [ RoleResolver, UserResolver ]
  });

  const server = new ApolloServer({
    context: async({ req }): Promise<IContext> => context(req),
    debug: false,
    schema
  });

  await server.listen(SERVER_PORT);
  console.log('Server has started!');
}

main().catch(console.error);
