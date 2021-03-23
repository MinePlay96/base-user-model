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
exports.RoleResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Role_1 = require("../models/Role");
const RoleInput_1 = require("./types/RoleInput");
let RoleResolver = class RoleResolver {
    async listRoles() {
        return Role_1.Role.find();
    }
    async showRole(id) {
        return Role_1.Role.findOne({ where: { id } });
    }
    async createRole(roleInput) {
        const role = Role_1.Role.create(roleInput).save();
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .relation(Role_1.Role, 'rights')
            .of(role)
            .add(roleInput.rightUUIDs);
        return role;
    }
};
__decorate([
    type_graphql_1.Query(() => [Role_1.Role]),
    type_graphql_1.Authorized('listRoles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "listRoles", null);
__decorate([
    type_graphql_1.Query(() => Role_1.Role, { nullable: true }),
    type_graphql_1.Authorized('showRole'),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "showRole", null);
__decorate([
    type_graphql_1.Mutation(() => Role_1.Role),
    type_graphql_1.Authorized('createRole'),
    __param(0, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RoleInput_1.RoleInput]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "createRole", null);
RoleResolver = __decorate([
    type_graphql_1.Resolver()
], RoleResolver);
exports.RoleResolver = RoleResolver;
