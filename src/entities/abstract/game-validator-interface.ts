import { GameEntityInterface } from '../../domain/entities/game-entity-interface';

export interface GameValidatorInterface {
  validateBody(): void;
  getBody(): GameEntityInterface;
  updateBody(mainGame: GameEntityInterface): GameEntityInterface;
}
