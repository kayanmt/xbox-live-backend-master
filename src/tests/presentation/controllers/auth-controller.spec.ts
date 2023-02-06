import { LoginAuthUseCaseStub } from '../../test-utils/stubs/useCases/auth/login-auth-usecase-stub';
import { AuthController } from '../../../presentation/controllers/auth/auth-controller';
import { makeHttpRequest } from '../../test-utils/http/make-http-request';
import { fakeUser } from '../../test-utils/fake-entities/fake-user';
import { makeError } from '../../test-utils/errors/make-error';

function makeLogin(email: string, password: string) {
  return { body: { email: email, password: password } };
}

interface SutTypes {
  loginAuthUseCaseStub: LoginAuthUseCaseStub;
  authController: AuthController;
}

function makeSut(): SutTypes {
  const loginAuthUseCaseStub = new LoginAuthUseCaseStub();
  const authController = new AuthController(loginAuthUseCaseStub);
  return { loginAuthUseCaseStub, authController };
}

describe('AuthController', () => {
  test('Should call LoginAuthUseCase with correct values.', async () => {
    const { loginAuthUseCaseStub, authController } = makeSut();
    const loginUseCaseSpy = jest.spyOn(loginAuthUseCaseStub, 'execute');
    await authController.login(
      makeHttpRequest(makeLogin(fakeUser.email, fakeUser.password)),
    );
    expect(loginUseCaseSpy).toHaveBeenCalledWith({
      email: fakeUser.email,
      password: fakeUser.password,
    });
  });

  test('Should return statusCode 401 if LoginAuthUseCase throws.', async () => {
    const { loginAuthUseCaseStub, authController } = makeSut();
    jest
      .spyOn(loginAuthUseCaseStub, 'execute')
      .mockReturnValueOnce(makeError());
    const promise = await authController.login(
      makeHttpRequest(makeLogin(fakeUser.email, fakeUser.password)),
    );
    expect(promise).toHaveProperty('statusCode');
    expect(promise.statusCode).toBe(401);
  });

  test('Should return statusCode 200 on success.', async () => {
    const { authController } = makeSut();
    const promise = await authController.login(
      makeHttpRequest(makeLogin(fakeUser.email, fakeUser.password)),
    );
    expect(promise).toHaveProperty('statusCode');
    expect(promise.statusCode).toBe(200);
  });
});
