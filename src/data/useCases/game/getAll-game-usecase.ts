import { GetAllGamesUseCaseInterface } from '../../../data/abstract/game/getAll-game-interface';
import { GameRepositoryInterface } from '../../../infra/repositories/abstract/game-repository-interface';
import { GameEntityInterface } from '../../../domain/entities/game-entity-interface';

export class GetAllGamesUseCase implements GetAllGamesUseCaseInterface {
  constructor(private readonly repository: GameRepositoryInterface) {}

  async execute(): Promise<GameEntityInterface[] | []> {
    return await this.repository.getAll();
  }
}
