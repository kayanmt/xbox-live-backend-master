import { makeError } from '../../test-utils/errors/make-error';
import { TokenHandlerAdapter } from '../../../utils/adapters/token-handler-adapter';
import { fakeUser } from '../../test-utils/fake-entities/fake-user';
import { InvalidParamError } from '../../../utils/errors';

process.env.SECRET = 'any_secret';
let token = '';

class GetUserByIdStub {
  async execute(): Promise<any> {
    return new Promise((resolve) => resolve(fakeUser));
  }
}

interface SutTypes {
  getUserByIdUseCaseStub: GetUserByIdStub;
  tokenHandlerAdapter: TokenHandlerAdapter;
}

function makeSut(): SutTypes {
  const getUserByIdUseCaseStub = new GetUserByIdStub();
  const tokenHandlerAdapter = new TokenHandlerAdapter(getUserByIdUseCaseStub);
  return { getUserByIdUseCaseStub, tokenHandlerAdapter };
}

describe('TokenHandlerAdapter', () => {
  test('GenerateToken should return a string.', () => {
    const { tokenHandlerAdapter } = makeSut();
    const generatedToken = tokenHandlerAdapter.generateToken(fakeUser.id);
    token = generatedToken;
    expect(typeof token).toBe('string');
  });

  test('Should throw if GenerateToken throws.', () => {
    const { tokenHandlerAdapter } = makeSut();
    jest
      .spyOn(tokenHandlerAdapter, 'generateToken')
      .mockReturnValueOnce(makeError());
    const generatedToken = tokenHandlerAdapter.generateToken('any_id');
    expect(generatedToken).rejects.toThrow();
  });

  test('ValidateToken should return a user if token is valid.', async () => {
    const { tokenHandlerAdapter } = makeSut();
    const validate = await tokenHandlerAdapter.validateToken(token);
    expect(validate).toBe(fakeUser);
  });

  test('Should throw if if token is not valid', async () => {
    const { tokenHandlerAdapter } = makeSut();
    const validate = tokenHandlerAdapter.validateToken('invalid_token');
    await expect(validate).rejects.toThrow(InvalidParamError);
  });

  test('Should throw if ValidateToken throws.', async () => {
    const { tokenHandlerAdapter } = makeSut();
    jest
      .spyOn(tokenHandlerAdapter, 'validateToken')
      .mockReturnValueOnce(makeError());
    const validate = tokenHandlerAdapter.validateToken('any_token');
    expect(validate).rejects.toThrow();
  });

  test('Should call GetUserById with user decoded id.', async () => {
    const { getUserByIdUseCaseStub, tokenHandlerAdapter } = makeSut();
    const getUserByIdSpy = jest.spyOn(getUserByIdUseCaseStub, 'execute');
    await tokenHandlerAdapter.validateToken(token);
    expect(getUserByIdSpy).toHaveBeenCalledWith(fakeUser.id);
  });

  test('Should throw GetUserById throws.', async () => {
    const { getUserByIdUseCaseStub, tokenHandlerAdapter } = makeSut();
    jest
      .spyOn(getUserByIdUseCaseStub, 'execute')
      .mockReturnValueOnce(makeError());
    const promise = tokenHandlerAdapter.validateToken(token);
    await expect(promise).rejects.toThrow(InvalidParamError);
  });
});
