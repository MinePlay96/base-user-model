"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const RoleResolver_1 = require("./resolvers/RoleResolver");
const UserResolver_1 = require("./resolvers/UserResolver");
const authChecker_1 = require("./authChecker");
const SERVER_PORT = 4000;
async function main() {
    const connection = await typeorm_1.createConnection();
    await connection.runMigrations();
    const schema = await type_graphql_1.buildSchema({
        authChecker: authChecker_1.authChecker,
        resolvers: [RoleResolver_1.RoleResolver, UserResolver_1.UserResolver]
    });
    const server = new apollo_server_1.ApolloServer({
        context: async ({ req }) => authChecker_1.context(req),
        debug: false,
        schema
    });
    await server.listen(SERVER_PORT);
    console.log('Server has started!');
}
main().catch(console.error);
