"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBaseUserData1613839361144 = void 0;
const rights_1 = require("../initData/rights");
const roles_1 = require("../initData/roles");
const user_1 = require("../initData/user");
const Right_1 = require("../models/Right");
const Role_1 = require("../models/Role");
const User_1 = require("../models/User");
// eslint-disable-next-line id-length
class AddBaseUserData1613839361144 {
    // eslint-disable-next-line @typescript-eslint/require-await
    async up(queryRunner) {
        // rights
        const rightModels = Promise.all(rights_1.rights.map(right => Right_1.Right.create({ name: right })));
        // roles
        const adminRole = await Role_1.Role.create(roles_1.admin);
        adminRole.rights = Promise.resolve(rightModels);
        // user
        const adminUser = User_1.User.create(user_1.admin);
        adminUser.roles = Promise.resolve([adminRole]);
        await adminUser.save();
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    async down(queryRunner) {
        console.log('can`t be reverted');
    }
}
exports.AddBaseUserData1613839361144 = AddBaseUserData1613839361144;
