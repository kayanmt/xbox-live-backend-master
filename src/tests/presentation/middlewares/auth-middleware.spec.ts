import { TokenHandlerAdapterStub } from '../../test-utils/stubs/adapters/token-handler-adapter-stub';
import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware';
import { makeHttpRequest } from '../../test-utils/http/make-http-request';
import { UnauthorizedError } from '../../../utils/errors';
import { makeError } from '../../test-utils/errors/make-error';
import { fakeUser } from '../../test-utils/fake-entities/fake-user';

function makeAuthorization(authorization: string) {
  return { headers: { authorization: authorization } };
}

interface SutTypes {
  tokenHandlerAdapterStub: TokenHandlerAdapterStub;
  authMiddleware: AuthMiddleware;
}

function makeSut(): SutTypes {
  const tokenHandlerAdapterStub = new TokenHandlerAdapterStub();
  const authMiddleware = new AuthMiddleware(tokenHandlerAdapterStub);
  return { tokenHandlerAdapterStub, authMiddleware };
}

describe('AuthMiddleware', () => {
  test('Should throw if authorization was not informed.', async () => {
    const { authMiddleware } = makeSut();
    const promise = authMiddleware.auth(makeHttpRequest({}));
    await expect(promise).rejects.toThrow(UnauthorizedError);
  });

  test('Should throw if authorization has not two words.', async () => {
    const { authMiddleware } = makeSut();
    const promise = authMiddleware.auth(
      makeHttpRequest(makeAuthorization('any_token')),
    );
    await expect(promise).rejects.toThrow(UnauthorizedError);
  });

  test('Should throw if authorization has not the word Bearer.', async () => {
    const { authMiddleware } = makeSut();
    const promise = authMiddleware.auth(
      makeHttpRequest(makeAuthorization('somer_word any_token')),
    );
    await expect(promise).rejects.toThrow(UnauthorizedError);
  });

  test('Should throw if authorization has more than three words.', async () => {
    const { authMiddleware } = makeSut();
    const promise = authMiddleware.auth(
      makeHttpRequest(makeAuthorization('some_word any_token another_word')),
    );
    await expect(promise).rejects.toThrow(UnauthorizedError);
  });

  test('Should call TokenHandler with correct value.', async () => {
    const { authMiddleware, tokenHandlerAdapterStub } = makeSut();
    const validatorSpy = jest.spyOn(tokenHandlerAdapterStub, 'validateToken');
    await authMiddleware.auth(
      makeHttpRequest(makeAuthorization('Bearer any_token')),
    );
    expect(validatorSpy).toHaveBeenCalledWith('any_token');
  });

  test('Should throw is TokenHandler throws.', async () => {
    const { authMiddleware, tokenHandlerAdapterStub } = makeSut();
    jest
      .spyOn(tokenHandlerAdapterStub, 'validateToken')
      .mockReturnValueOnce(makeError());
    const promise = authMiddleware.auth(
      makeHttpRequest(makeAuthorization('Bearer any_token')),
    );
    await expect(promise).rejects.toThrow(UnauthorizedError);
  });

  test('Should return a user on success.', async () => {
    const { authMiddleware } = makeSut();
    const user = await authMiddleware.auth(
      makeHttpRequest(makeAuthorization('Bearer any_token')),
    );
    expect(user).toBe(fakeUser);
  });
});
