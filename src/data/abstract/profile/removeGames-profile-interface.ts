export interface RemoveGamesProfileUseCaseInterface {
  execute(
    profileId: string,
    gameIds: string[],
    userId: string,
  ): Promise<boolean>;
}
