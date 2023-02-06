import { makeError } from '../../../test-utils/errors/make-error';
import { GetOneProfileUseCase } from '../../../../data/useCases/profile/getOne-profile-usecase';
import { fakeProfile } from '../../../test-utils/fake-entities/fake-profile';
import { ProfileRepositoryStub } from '../../../test-utils/stubs/repositories/profile-repository-stub';
import { InvalidParamError } from '../../../../utils/errors';
import { fakeUser } from '../../../test-utils/fake-entities/fake-user';

interface SutTypes {
  profileRepositoryStub: ProfileRepositoryStub;
  getOneProfileUseCase: GetOneProfileUseCase;
}

function makeSut(): SutTypes {
  const profileRepositoryStub = new ProfileRepositoryStub();
  const getOneProfileUseCase = new GetOneProfileUseCase(profileRepositoryStub);
  return { profileRepositoryStub, getOneProfileUseCase };
}

describe('GetOneProfileUseCase', () => {
  test('Should call ProfileReposiory with correct value.', async () => {
    const { profileRepositoryStub, getOneProfileUseCase } = makeSut();
    const getOneSpy = jest.spyOn(profileRepositoryStub, 'getOne');
    await getOneProfileUseCase.execute(fakeProfile.id, fakeUser.id);
    expect(getOneSpy).toHaveBeenCalledWith(fakeProfile.id);
  });

  test('Should throw if ProfileReposiory throws.', async () => {
    const { profileRepositoryStub, getOneProfileUseCase } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'getOne')
      .mockReturnValueOnce(makeError());
    const promise = getOneProfileUseCase.execute(
      fakeProfile.id,
      fakeProfile.id,
    );
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if foundProfile.userId is different than the given user id.', async () => {
    const { profileRepositoryStub, getOneProfileUseCase } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'getOne')
      .mockReturnValueOnce(
        new Promise((resolve) =>
          resolve({ ...fakeProfile, userId: 'another_id' }),
        ),
      );
    const promise = getOneProfileUseCase.execute(
      fakeProfile.id,
      fakeProfile.id,
    );
    await expect(promise).rejects.toThrow(InvalidParamError);
  });

  test('Should throw if foundProfile.getOne return void.', async () => {
    const { profileRepositoryStub, getOneProfileUseCase } = makeSut();
    jest
      .spyOn(profileRepositoryStub, 'getOne')
      .mockReturnValueOnce(new Promise((resolve) => resolve()));
    const promise = getOneProfileUseCase.execute(
      fakeProfile.id,
      fakeProfile.id,
    );
    await expect(promise).rejects.toThrow(InvalidParamError);
  });
});
