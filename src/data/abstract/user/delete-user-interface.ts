export interface DeleteUserUseCaseInterface {
  execute(id: string): Promise<boolean>;
}
