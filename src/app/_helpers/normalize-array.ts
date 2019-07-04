export function normalizeArray<T>(array: Array<T>, indexKey: keyof T) {
  const normalizedObject: any = {};
  for (const item of array) {
    const key = item[indexKey];
    normalizedObject[key] = item;
  }
  return normalizedObject as { [key: string]: T };
}
