import { GameDto } from '../../../domain/dtos/game-dto';

export interface CreateGameUseCaseInterface {
  execute(body: GameDto): Promise<boolean>;
}
