export function makeError(): any {
  return new Promise((resolve, reject) => reject(new Error()));
}
