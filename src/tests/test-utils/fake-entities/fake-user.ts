export const fakeUser = {
  id: 'any_userId',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  cpf: 'any_cpf',
  isAdmin: false,
  profiles: [],
  createdAt: new Date().toISOString().split('T')[0],
  updatedAt: new Date().toISOString().split('T')[0],
};

export const fakeUserWithoutPassword = {
  id: 'any_userId',
  name: 'any_name',
  email: 'any_email',
  cpf: 'any_cpf',
  isAdmin: false,
  profiles: [],
  createdAt: new Date().toISOString().split('T')[0],
  updatedAt: new Date().toISOString().split('T')[0],
};
