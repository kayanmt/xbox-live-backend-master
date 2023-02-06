export interface DeleteProfileUseCaseInterface {
  execute(profileId: string, userId: string): Promise<boolean>;
}
