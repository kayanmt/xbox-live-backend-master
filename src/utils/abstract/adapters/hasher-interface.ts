export interface HasherInterface {
  hash(password: string, saltRounds: number): string;
  compare(password: string, hashedPassword: string): boolean;
}
