import { IdGeneratorInterface } from 'src/utils/abstract/adapters/id-generator-interface';
import { v4 as uuid } from 'uuid';

export class IdGeneratorAdapter implements IdGeneratorInterface {
  generateId(): string {
    return uuid();
  }
}
