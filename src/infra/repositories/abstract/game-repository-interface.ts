import { GameEntityInterface } from '../../../domain/entities/game-entity-interface';

export interface GameRepositoryInterface {
  create(body: GameEntityInterface): Promise<GameEntityInterface>;
  getOne(id: string): Promise<GameEntityInterface | void>;
  getAll(): Promise<GameEntityInterface[] | []>;
  update(
    body: GameEntityInterface,
    id: string,
  ): Promise<GameEntityInterface | void>;
  delete(id: string): Promise<GameEntityInterface | void>;
}
