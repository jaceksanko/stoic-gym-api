import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Password } from '../entities/user/Password';
import { Role, UserRole } from '../entities/user/Role';
import { User } from '../entities/user/User';
const bcrypt = require('bcrypt');

export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  private roleRepository = AppDataSource.getRepository(Role);
  private passwordRepository = AppDataSource.getRepository(Password);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find({
      relations: {
        exercises: true,
      },
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return await this.userRepository.findOneBy({
      id: request.params.id,
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, email, password, role } = request.body;
    const roles = await this.roleRepository.find();

    let adminRole;
    let editorRole;

    if (roles.length !== 0) {
      adminRole = roles.find((role) => role.role === UserRole.ADMIN);
      editorRole = roles.find((role) => role.role === UserRole.EDITOR);
    } else {
      const userAdminRole = new Role();
      userAdminRole.role = UserRole.ADMIN;
      await this.roleRepository.save(userAdminRole);
      adminRole = userAdminRole;

      const userEditorRole = new Role();
      userEditorRole.role = UserRole.EDITOR;
      await this.roleRepository.save(userEditorRole);
      editorRole = userEditorRole;
    }

    const userPassword = new Password();
    userPassword.password = await bcrypt.hash(password, 10);

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = userPassword;
    user.role = role === UserRole.ADMIN ? adminRole : editorRole;

    await this.passwordRepository.save(userPassword);
    return this.userRepository.save(user);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOne({
      relations: {
        password: true,
      },
      where: { id: request.params.id },
    });
    let passwordToRemove = await this.passwordRepository.findOneBy({
      id: userToRemove.password.id,
    });

    await this.userRepository.remove(userToRemove);
    await this.passwordRepository.remove(passwordToRemove);
  }
}
