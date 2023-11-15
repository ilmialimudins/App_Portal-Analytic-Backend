export const removeArrObj = <T>(array: T[], index: number): T[] => {
  if (array.length === 0 || index < 0 || index >= array.length) return array;

  return array.filter((_, i) => i !== index);
};
