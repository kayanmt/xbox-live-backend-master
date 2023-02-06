import { HasherInterface } from '../../../../utils/abstract/adapters/hasher-interface';

export class HasherAdapterStub implements HasherInterface {
  hash(): string {
    return 'hashed_password';
  }
  compare(): boolean {
    return true;
  }
}
