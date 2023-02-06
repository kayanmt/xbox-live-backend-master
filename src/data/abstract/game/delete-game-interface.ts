export interface DeleteGameUseCaseInterface {
  execute(id: string): Promise<boolean>;
}
