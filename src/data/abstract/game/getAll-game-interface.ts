import { GameEntityInterface } from "src/domain/entities/game-entity-interface";

export interface GetAllGamesUseCaseInterface {
  execute(): Promise<GameEntityInterface[] | []>;
}
