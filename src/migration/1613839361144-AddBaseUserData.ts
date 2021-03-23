import { MigrationInterface, QueryRunner } from 'typeorm';
import { rights } from '../initData/rights';
import { admin as adminRoleData } from '../initData/roles';
import { admin as adminUserData } from '../initData/user';
import { Right } from '../models/Right';
import { Role } from '../models/Role';
import { User } from '../models/User';

// eslint-disable-next-line id-length
export class AddBaseUserData1613839361144 implements MigrationInterface {

  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(queryRunner: QueryRunner): Promise<void> {

    // rights
    const rightModels = Promise.all(rights.map(right => Right.create({ name: right })));

    // roles
    const adminRole = await Role.create(adminRoleData);

    adminRole.rights = Promise.resolve(rightModels);

    // user
    const adminUser = User.create(adminUserData);

    adminUser.roles = Promise.resolve([adminRole]);

    await adminUser.save();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('can`t be reverted');
  }

}
