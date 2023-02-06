import { fakeUser } from '../../../test-utils/fake-entities/fake-user';
import { LoginAuthUseCase } from '../../../../data/useCases/auth/login-auth-usecase';
import { fakeLogin } from '../../../test-utils/fake-entities/fake-login';
import { HasherAdapterStub } from '../../../test-utils/stubs/adapters/hasher-adapter-stub';
import { TokenHandlerAdapterStub } from '../../../test-utils/stubs/adapters/token-handler-adapter-stub';
import { UserRepositoryStub } from '../../../test-utils/stubs/repositories/user-repository-stub';
import { InvalidParamError } from '../../../../utils/errors';
import { makeError } from '../../../test-utils/errors/make-error';

interface SutTypes {
  userRepositoryStub: UserRepositoryStub;
  hasherAdapterStub: HasherAdapterStub;
  tokenHandlerAdapterStub: TokenHandlerAdapterStub;
  loginAuthUseCase: LoginAuthUseCase;
}

function makeSut(): SutTypes {
  const userRepositoryStub = new UserRepositoryStub();
  const hasherAdapterStub = new HasherAdapterStub();
  const tokenHandlerAdapterStub = new TokenHandlerAdapterStub();
  const loginAuthUseCase = new LoginAuthUseCase(
    userRepositoryStub,
    hasherAdapterStub,
    tokenHandlerAdapterStub,
  );
  return {
    userRepositoryStub,
    hasherAdapterStub,
    tokenHandlerAdapterStub,
    loginAuthUseCase,
  };
}
describe('LoginAuthUseCase', () => {
  test('Should call UserRepository on success.', async () => {
    const { userRepositoryStub, loginAuthUseCase } = makeSut();
    const getByEmailSpy = jest.spyOn(userRepositoryStub, 'getOneByEmail');
    await loginAuthUseCase.execute(fakeLogin);
    expect(getByEmailSpy).toHaveBeenCalledWith(fakeLogin.email);
  });

  test('Should call Hasher on success.', async () => {
    const { hasherAdapterStub, loginAuthUseCase } = makeSut();
    const compareSpy = jest.spyOn(hasherAdapterStub, 'compare');
    await loginAuthUseCase.execute(fakeLogin);
    expect(compareSpy).toHaveBeenCalledWith(
      fakeUser.password,
      fakeUser.password,
    );
  });

  test('Should call TokenHandler on success.', async () => {
    const { tokenHandlerAdapterStub, loginAuthUseCase } = makeSut();
    const generateTokenSpy = jest.spyOn(
      tokenHandlerAdapterStub,
      'generateToken',
    );
    await loginAuthUseCase.execute(fakeLogin);
    expect(generateTokenSpy).toHaveBeenCalledWith(fakeUser.id);
  });

  test('Should return a token on success.', async () => {
    const { loginAuthUseCase } = makeSut();
    const token = await loginAuthUseCase.execute(fakeLogin);
    expect(token).toBe('generated_token');
  });

  test('Should throw if foundUser is null.', async () => {
    const { loginAuthUseCase, userRepositoryStub } = makeSut();
    jest
      .spyOn(userRepositoryStub, 'getOneByEmail')
      .mockReturnValueOnce(new Promise((resolve) => resolve()));
    const promise = loginAuthUseCase.execute(fakeLogin);
    await expect(promise).rejects.toThrow(InvalidParamError);
  });

  test('Should throw if password validation is false.', async () => {
    const { hasherAdapterStub, loginAuthUseCase } = makeSut();
    jest.spyOn(hasherAdapterStub, 'compare').mockReturnValueOnce(false);
    const promise = loginAuthUseCase.execute(fakeLogin);
    await expect(promise).rejects.toThrow(InvalidParamError);
  });

  test('Should throw if UserRepository throws.', async () => {
    const { userRepositoryStub, loginAuthUseCase } = makeSut();
    jest.spyOn(userRepositoryStub, 'getOneByEmail').mockReturnValueOnce(makeError());
    const promise = loginAuthUseCase.execute(fakeLogin);
    await expect(promise).rejects.toThrow();
  });
});
