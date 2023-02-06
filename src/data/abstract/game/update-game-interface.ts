import { GameDto } from '../../../domain/dtos/game-dto';

export interface UpdateGameUseCaseInterface {
  execute(body: GameDto, id: string): Promise<boolean>;
}
