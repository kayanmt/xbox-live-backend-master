import { UserDto } from '../domain/dtos/user-dto';
import { UserEntityInterface } from '../domain/entities/user-entity-interface';
import { UserValidatorInterface } from '../entities/abstract/user-validator-interface';
import { EnvVarsAdapter } from '../utils/adapters/env-vars-adapter';
import { HasherAdapter } from '../utils/adapters/hasher-adapter';
import { IdGeneratorAdapter } from '../utils/adapters/id-generator-adapter';
import { MissingParamError } from '../utils/errors';

export class UserEntity implements UserValidatorInterface {
  constructor(private readonly user: UserDto) {}

  validateBody(): void {
    if (!this.user.name) {
      throw new MissingParamError('Name');
    }
    if (!this.user.password) {
      throw new MissingParamError('Password');
    }
    if (!this.user.email) {
      throw new MissingParamError('Email');
    }
  }

  getBody(): UserEntityInterface {
    const generatedId = new IdGeneratorAdapter().generateId();
    const hashedPassword = new HasherAdapter().hash(this.user.password, 10);
    const isAdmin =
      this.user.secret &&
      this.user.secret === new EnvVarsAdapter().adminPassword;
    const todayDate = new Date().toISOString().split('T')[0];

    return {
      id: this.user.id ?? generatedId,
      name: this.user.name,
      email: this.user.email,
      password: hashedPassword,
      cpf: this.user.cpf ?? '',
      isAdmin: isAdmin ?? false,
      profiles: [],
      createdAt: todayDate,
      updatedAt: todayDate,
    };
  }

  updateBody(mainUser: UserEntityInterface) {
    const todayDate = new Date().toISOString().split('T')[0];
    const password = this.user.password
      ? new HasherAdapter().hash(this.user.password, 10)
      : mainUser.password;
    const isAdmin =
      this.user.secret &&
      this.user.secret === new EnvVarsAdapter().adminPassword;

    return {
      id: mainUser.id,
      name: this.user.name ?? mainUser.name,
      email: this.user.email ?? mainUser.email,
      password: password,
      cpf: this.user.cpf ?? mainUser.cpf,
      isAdmin: isAdmin ?? mainUser.isAdmin,
      profiles: mainUser.profiles,
      createdAt: mainUser.createdAt,
      updatedAt: todayDate,
    };
  }
}
