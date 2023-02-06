import { GameEntityInterface } from 'src/domain/entities/game-entity-interface';

export interface GetOneGameUseCaseInterface {
  execute(id: string): Promise<GameEntityInterface | void>;
}
