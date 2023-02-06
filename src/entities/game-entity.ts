import { GameDto } from '../domain/dtos/game-dto';
import { GameEntityInterface } from '../domain/entities/game-entity-interface';
import { GameValidatorInterface } from '../entities/abstract/game-validator-interface';
import { IdGeneratorAdapter } from '../utils/adapters/id-generator-adapter';
import { MissingParamError } from '../utils/errors';

export class GameEntity implements GameValidatorInterface {
  constructor(private readonly game: GameDto) {}

  validateBody(): void {
    if (!this.game.title) {
      throw new MissingParamError('Title');
    }
    if (!this.game.year) {
      throw new MissingParamError('Year');
    }
    if (!this.game.description) {
      throw new MissingParamError('Description');
    }
    if (!this.game.coverImageUrl) {
      throw new MissingParamError('Cover image');
    }
  }

  getBody(): GameEntityInterface {
    const todayDate = new Date().toISOString().split('T')[0];

    return {
      id: this.game.id ?? new IdGeneratorAdapter().generateId(),
      title: this.game.title,
      coverImageUrl: this.game.coverImageUrl,
      description: this.game.description,
      year: this.game.year,
      gender: this.game.gender ?? '',
      imdbScore: this.game.imdbScore ?? 0,
      trailerYouTubeUrl: this.game.trailerYouTubeUrl ?? '',
      gameplayYouTubeUrl: this.game.gameplayYouTubeUrl ?? '',
      userId: this.game.userId,
      createdAt: todayDate,
      updatedAt: todayDate,
    };
  }

  updateBody(mainGame: GameEntityInterface): GameEntityInterface {
    const todayDate = new Date().toISOString().split('T')[0];

    return {
      id: mainGame.id,
      title: this.game.title ?? mainGame.title,
      coverImageUrl: this.game.coverImageUrl ?? mainGame.coverImageUrl,
      description: this.game.description ?? mainGame.description,
      year: this.game.year ?? mainGame.year,
      gender: this.game.gender ?? mainGame.gender,
      imdbScore: this.game.imdbScore ?? mainGame.imdbScore,
      trailerYouTubeUrl:
        this.game.trailerYouTubeUrl ?? mainGame.trailerYouTubeUrl,
      gameplayYouTubeUrl:
        this.game.gameplayYouTubeUrl ?? mainGame.gameplayYouTubeUrl,
      userId: mainGame.userId,
      createdAt: mainGame.createdAt,
      updatedAt: todayDate,
    };
  }
}
