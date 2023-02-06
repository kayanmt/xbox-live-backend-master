import { makeError } from '../../test-utils/errors/make-error';
import { HasherAdapter } from '../../../utils/adapters/hasher-adapter';

interface SutTypes {
  hasherAdapter: HasherAdapter;
}

function makeSut(): SutTypes {
  const hasherAdapter = new HasherAdapter();
  return { hasherAdapter };
}

let hashed_password = '';

describe('HasherAdapter', () => {
  test('Hash method should return a string.', () => {
    const { hasherAdapter } = makeSut();
    const hash = hasherAdapter.hash('any_password', 10);
    hashed_password = hash;
    expect(hash).toBeDefined();
    expect(typeof hash).toBe('string');
  });

  test('Should throw if Hash throws.', () => {
    const { hasherAdapter } = makeSut();
    jest.spyOn(hasherAdapter, 'hash').mockReturnValueOnce(makeError());
    const hash = hasherAdapter.hash('any_password', 10);
    expect(hash).rejects.toThrow();
  });

  test('Compare should return true if password matches with hashed password.', () => {
    const { hasherAdapter } = makeSut();
    const compare = hasherAdapter.compare('any_password', hashed_password);
    expect(compare).toBe(true);
  });

  test('Compare should return false if password does not match with hashed password.', () => {
    const { hasherAdapter } = makeSut();
    const compare = hasherAdapter.compare('wrong_password', hashed_password);
    expect(compare).toBe(false);
  });

  test('Should throw if Compare throws.', () => {
    const { hasherAdapter } = makeSut();
    jest.spyOn(hasherAdapter, 'compare').mockReturnValueOnce(makeError());
    const compare = hasherAdapter.compare('any_password', 'hashed_password');
    expect(compare).rejects.toThrow();
  });
});
