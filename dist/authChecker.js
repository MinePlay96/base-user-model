"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = exports.authChecker = void 0;
const apollo_server_1 = require("apollo-server");
const User_1 = require("./models/User");
const authChecker = async ({ context: { user } }, requierdRights) => {
    // get all roles from user / get only the names as array
    const userRoles = await user.roles;
    const userRights = new Set();
    await Promise.all(userRoles.map(async (role) => {
        const rights = await role.rights;
        rights.forEach(right => {
            userRights.add(right.name);
        });
    }));
    // check if the requierd roles array contains a role of the user
    return requierdRights.some(requierdRight => userRights.has(requierdRight));
};
exports.authChecker = authChecker;
async function context(req) {
    const { username, password } = req.headers;
    if (typeof username !== 'string' || typeof password !== 'string') {
        throw new apollo_server_1.AuthenticationError('no credentials present requiers headers "username" and "password"');
    }
    const user = await User_1.User.findOne({
        relations: ['roles', 'roles.rights'],
        where: { name: username }
    });
    if (!user || !await user.comparePassword(password)) {
        throw new apollo_server_1.AuthenticationError('wrong credentials');
    }
    return { user };
}
exports.context = context;
