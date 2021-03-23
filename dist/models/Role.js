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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Right_1 = require("./Right");
const DESCRIPTION_LENGTH = 250;
let Role = class Role extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Role.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ length: DESCRIPTION_LENGTH }),
    __metadata("design:type", String)
], Role.prototype, "desctiption", void 0);
__decorate([
    type_graphql_1.Field(() => [Right_1.Right]),
    typeorm_1.JoinTable(),
    typeorm_1.ManyToMany(() => Right_1.Right, {
        cascade: true
    }),
    __metadata("design:type", Promise)
], Role.prototype, "rights", void 0);
Role = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Role);
exports.Role = Role;
