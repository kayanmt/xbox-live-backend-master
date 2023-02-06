import { AuthMiddlewareStub } from '../../test-utils/stubs/middlewares/auth-middleware-stub';
import { CreateUserUseCaseStub } from '../../test-utils/stubs/useCases/user/create-user-usecase-stub';
import { DeleteUserUseCaseStub } from '../../test-utils/stubs/useCases/user/delete-user-usecase-stub';
import { GetAllUsersUseCaseStub } from '../../test-utils/stubs/useCases/user/getAll-user-usecase-stub';
import { GetOneUserByEmailUseCaseStub } from '../../test-utils/stubs/useCases/user/getOne-user-byEmail-usecase-stub';
import { GetOneUserByIdUseCaseStub } from '../../test-utils/stubs/useCases/user/getOne-user-byId-usecase-stub';
import { UpdateUserUseCaseStub } from '../../test-utils/stubs/useCases/user/update-user-usecase-stub';
import { UserController } from '../../../presentation/controllers/user/user-controller';
import { makeHttpRequest } from '../../test-utils/http/make-http-request';
import { fakeUser } from '../../test-utils/fake-entities/fake-user';

function makeRequestBody(body: any) {
  return { body: body };
}

function makeRequestParams(param: any) {
  return { params: param };
}

interface SutTypes {
  authMiddlewareStub: AuthMiddlewareStub;
  createUserUseCaseStub: CreateUserUseCaseStub;
  getOneUserByEmailUseCaseStub: GetOneUserByEmailUseCaseStub;
  getOneUserByIdUseCaseStub: GetOneUserByIdUseCaseStub;
  getAllUsersUseCaseStub: GetAllUsersUseCaseStub;
  updateUserUseCaseStub: UpdateUserUseCaseStub;
  deleteUserUseCaseStub: DeleteUserUseCaseStub;
  userController: UserController;
}

function makeSut(): SutTypes {
  const authMiddlewareStub = new AuthMiddlewareStub();
  const createUserUseCaseStub = new CreateUserUseCaseStub();
  const getOneUserByEmailUseCaseStub = new GetOneUserByEmailUseCaseStub();
  const getOneUserByIdUseCaseStub = new GetOneUserByIdUseCaseStub();
  const getAllUsersUseCaseStub = new GetAllUsersUseCaseStub();
  const updateUserUseCaseStub = new UpdateUserUseCaseStub();
  const deleteUserUseCaseStub = new DeleteUserUseCaseStub();
  const userController = new UserController(
    authMiddlewareStub,
    createUserUseCaseStub,
    getOneUserByEmailUseCaseStub,
    getOneUserByIdUseCaseStub,
    getAllUsersUseCaseStub,
    updateUserUseCaseStub,
    deleteUserUseCaseStub,
  );
  return {
    authMiddlewareStub,
    createUserUseCaseStub,
    getOneUserByEmailUseCaseStub,
    getOneUserByIdUseCaseStub,
    getAllUsersUseCaseStub,
    updateUserUseCaseStub,
    deleteUserUseCaseStub,
    userController,
  };
}

describe('UserController-Create', () => {
  test('Should call CreateUserUseCase with request body.', async () => {
    const { createUserUseCaseStub, userController } = makeSut();
    const createUseCaseSpy = jest.spyOn(createUserUseCaseStub, 'execute');
    await userController.create(
      makeHttpRequest(makeRequestBody({ id: fakeUser.id })),
    );
    expect(createUseCaseSpy).toHaveBeenCalledWith({ id: fakeUser.id });
  });
});

describe('UserController-GetOneByEmail', () => {
  test('Should call GetOneUserByEmailUseCase with the email.', async () => {
    const { getOneUserByEmailUseCaseStub, userController } = makeSut();
    const getOneUseCaseSpy = jest.spyOn(
      getOneUserByEmailUseCaseStub,
      'execute',
    );
    await userController.getOneByEmail(
      makeHttpRequest(makeRequestBody({ email: fakeUser.email })),
    );
    expect(getOneUseCaseSpy).toHaveBeenCalledWith(fakeUser.email);
  });
});

describe('UserController-GetOneById', () => {
  test('Should call GetOneUserByIdUseCase with the ID.', async () => {
    const { getOneUserByIdUseCaseStub, userController } = makeSut();
    const getOneUseCaseSpy = jest.spyOn(getOneUserByIdUseCaseStub, 'execute');
    await userController.getOneById(
      makeHttpRequest(makeRequestParams({ id: fakeUser.id })),
    );
    expect(getOneUseCaseSpy).toHaveBeenCalledWith(fakeUser.id);
  });
});

describe('UserController-GetAllUsersUseCase', () => {
  test('Should call GetAllUsersUseCaseStub.', async () => {
    const { authMiddlewareStub, getAllUsersUseCaseStub, userController } =
      makeSut();
    const getAllUseCaseSpy = jest.spyOn(getAllUsersUseCaseStub, 'execute');
    jest
      .spyOn(authMiddlewareStub, 'auth')
      .mockReturnValueOnce(
        new Promise((resolve) => resolve({ ...fakeUser, isAdmin: true })),
      );
    await userController.getAll(makeHttpRequest(makeRequestParams({})));
    expect(getAllUseCaseSpy).toHaveBeenCalled();
  });
});

describe('UserController-Update', () => {
  test('Should call UpdateUserUseCase with correct values.', async () => {
    const { authMiddlewareStub, updateUserUseCaseStub, userController } =
      makeSut();
    const updateUseCaseSpy = jest.spyOn(updateUserUseCaseStub, 'execute');
    jest
      .spyOn(authMiddlewareStub, 'auth')
      .mockReturnValueOnce(
        new Promise((resolve) => resolve({ ...fakeUser, isAdmin: true })),
      );
    await userController.update(
      makeHttpRequest({ params: { id: fakeUser.id }, body: fakeUser }),
    );
    expect(updateUseCaseSpy).toHaveBeenCalledWith(fakeUser, fakeUser.id);
  });
});
