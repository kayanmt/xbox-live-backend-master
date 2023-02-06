import { makeError } from '../../../test-utils/errors/make-error';
import { CreateProfileUseCase } from '../../../../data/useCases/profile/create-profile-usecase';
import { fakeProfile } from '../../../test-utils/fake-entities/fake-profile';
import { ProfileRepositoryStub } from '../../../test-utils/stubs/repositories/profile-repository-stub';

interface SutTypes {
  profileRepositoryStub: ProfileRepositoryStub;
  createProfileUseCase: CreateProfileUseCase;
}

function makeSut(): SutTypes {
  const profileRepositoryStub = new ProfileRepositoryStub();
  const createProfileUseCase = new CreateProfileUseCase(profileRepositoryStub);
  return { profileRepositoryStub, createProfileUseCase };
}

describe('CreateUserUseCase', () => {
  test('Should call ProfileRepository with correct value.', async () => {
    const { profileRepositoryStub, createProfileUseCase } = makeSut();
    const createSpy = jest.spyOn(profileRepositoryStub, 'create');
    await createProfileUseCase.execute(fakeProfile);
    expect(createSpy).toHaveBeenCalledWith(fakeProfile);
  });

  test('Should throw if ProfileRepository throws.', async () => {
    const { profileRepositoryStub, createProfileUseCase } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'create')
      .mockReturnValueOnce(makeError());
    const promise = createProfileUseCase.execute(fakeProfile);
    await expect(promise).rejects.toThrow();
  });

  test('Should return true if called with correct user.', async () => {
    const { createProfileUseCase } = makeSut();
    const promise = await createProfileUseCase.execute(fakeProfile);
    expect(promise).toBe(true);
  });
});
