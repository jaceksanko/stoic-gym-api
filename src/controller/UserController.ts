import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Password } from '../entities/user/Password';
import { Role } from '../entities/user/Role';
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
    return this.userRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, email, password, role } = request.body;
    const userRole = new Role();
    userRole.role = role;
    await this.roleRepository.save(userRole);

    const userPassword = new Password();
    userPassword.password = await bcrypt.hash(password, 10);
    await this.passwordRepository.save(userPassword);

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = userPassword;
    user.role = userRole;
    return this.userRepository.save(user);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOneBy({
      id: request.params.id,
    });
    await this.userRepository.remove(userToRemove);
  }
}
