export function compareAsJson(a: any, b: any): boolean {
  return JSON.stringify(a) == JSON.stringify(b);
}
