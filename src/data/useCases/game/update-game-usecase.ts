import { UpdateGameUseCaseInterface } from '../../../data/abstract/game/update-game-interface';
import { GameRepositoryInterface } from '../../../infra/repositories/abstract/game-repository-interface';
import { GameEntity } from '../../../entities/game-entity';
import { GameDto } from '../../../domain/dtos/game-dto';
import { InvalidParamError } from '../../../utils/errors';

export class UpdateGameUseCase implements UpdateGameUseCaseInterface {
  constructor(private readonly repository: GameRepositoryInterface) {}

  async execute(body: GameDto, id: string): Promise<boolean> {
    const foundGame = await this.repository.getOne(id);

    if (foundGame) {
      const updatedBody = new GameEntity(body).updateBody(foundGame);
      const updatedGame = await this.repository.update(updatedBody, id);

      if (updatedGame) {
        return true;
      } else {
        return false;
      }
    } else {
      throw new InvalidParamError('ID');
    }
  }
}
