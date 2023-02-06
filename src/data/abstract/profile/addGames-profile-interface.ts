export interface AddGamesProfileUseCaseInterface {
  execute(
    profileId: string,
    gameIds: string[],
    userId: string,
  ): Promise<boolean>;
}
