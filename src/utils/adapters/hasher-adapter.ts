import { HasherInterface } from '../abstract/adapters/hasher-interface';
import { hashSync, compareSync } from 'bcrypt';

export class HasherAdapter implements HasherInterface {
  hash(password: string, saltRounds: number): string {
    return hashSync(password, saltRounds);
  }

  compare(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  }
}
