import { ProfileEntityInterface } from '../../domain/entities/profile-entity-interface';

export interface ProfileValidatorInterface {
  validateBody(): void;
  getBody(): ProfileEntityInterface;
  updateBody(mainProfile: ProfileEntityInterface): ProfileEntityInterface;
}
