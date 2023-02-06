import { LoginDto } from '../../../domain/dtos/login-dto';

export interface LoginAuthUseCaseInterface {
  execute(body: LoginDto): Promise<string | null>;
}
