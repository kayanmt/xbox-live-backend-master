import { GetOneUserByIdUseCase } from 'src/data/useCases/user/getOne-user-byId-usecase';
import { UserRepository } from 'src/infra/repositories/user-repository';
import { TokenHandlerAdapter } from 'src/utils/adapters/token-handler-adapter';

export function makeTokenHandler() {
  const repository = new UserRepository();
  const getOneUserByIdUseCase = new GetOneUserByIdUseCase(repository);
  return new TokenHandlerAdapter(getOneUserByIdUseCase);
}
