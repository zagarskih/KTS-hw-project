export const omit = <T extends Record<PropertyKey, unknown>>(value: T, key: keyof T) => {
  const copied = { ...value };
  delete copied[key];
  return copied;
};
