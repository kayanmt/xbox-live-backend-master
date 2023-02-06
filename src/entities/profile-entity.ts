import { ProfileDto } from 'src/domain/dtos/profile-dto';
import { ProfileEntityInterface } from '../domain/entities/profile-entity-interface';
import { ProfileValidatorInterface } from '../entities/abstract/profile-validator-interface';
import { IdGeneratorAdapter } from '../utils/adapters/id-generator-adapter';
import { MissingParamError } from '../utils/errors';

export class ProfileEntity implements ProfileValidatorInterface {
  constructor(private readonly profile: ProfileDto) {}

  validateBody(): void {
    if (!this.profile.title) {
      throw new MissingParamError('Title');
    }
  }

  getBody(): ProfileEntityInterface {
    const todayDate = new Date().toISOString().split('T')[0];

    return {
      id: this.profile.id ?? new IdGeneratorAdapter().generateId(),
      title: this.profile.title,
      imageUrl: this.profile.imageUrl ?? '',
      favoriteGames: [],
      userId: this.profile.userId,
      createdAt: todayDate,
      updatedAt: todayDate,
    };
  }

  updateBody(mainProfile: ProfileEntityInterface): ProfileEntityInterface {
    const todayDate = new Date().toISOString().split('T')[0];

    return {
      id: mainProfile.id,
      title: this.profile.title ?? mainProfile.title,
      imageUrl: this.profile.imageUrl ?? mainProfile.imageUrl,
      favoriteGames: mainProfile.favoriteGames,
      userId: mainProfile.userId,
      createdAt: mainProfile.createdAt,
      updatedAt: todayDate,
    };
  }
}
