"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const user_1 = require("../initData/user");
const User_1 = require("../models/User");
const UserInput_1 = require("./types/UserInput");
let UserResolver = class UserResolver {
    async listUser() {
        return User_1.User.find();
    }
    async showUser(id) {
        return User_1.User.findOne({ where: { id } });
    }
    async createUser(userInput) {
        const user = await User_1.User.create(userInput).save();
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .relation(User_1.User, 'roles')
            .of(user)
            .add(userInput.roleUUIDs);
        return user;
    }
    async deleteUser(ids) {
        if (ids.includes(user_1.admin.id)) {
            throw new apollo_server_1.UserInputError('can`t delet the admin user');
        }
        const users = await User_1.User.findByIds(ids);
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (users.length === 0) {
            throw new apollo_server_1.UserInputError('no user to delete found');
        }
        await Promise.all(users.map(async (user) => user.remove()));
        return true;
    }
};
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    type_graphql_1.Authorized('listUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "listUser", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    type_graphql_1.Authorized('showUser'),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "showUser", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User),
    type_graphql_1.Authorized('createUser'),
    __param(0, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput_1.UserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.Authorized('deleteUser'),
    __param(0, type_graphql_1.Arg('ids', () => [String])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
