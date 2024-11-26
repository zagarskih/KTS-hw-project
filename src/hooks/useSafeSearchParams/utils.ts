import { z } from 'zod';

export const serializeSearchParams = (
  value: Record<string, unknown> | null,
) => {
  const serialized: Record<string, string> = {};

  Object.entries(value ?? {}).forEach((entry) => {
    const [key, value] = entry;
    try {
      serialized[key] = JSON.stringify(value);
    } catch {
      // Do nothing because can't searialize
    }
  });

  return new URLSearchParams(serialized);
};

export const parseSearchParams = <Schema extends z.ZodSchema>(
  searchParams: URLSearchParams,
  schema: Schema,
) => {
  const result: Record<string, unknown> = {};

  searchParams.forEach((value, key) => {
    try {
      result[key] = JSON.parse(value);
    } catch {
      result[key] = value;
    }
  });

  const parsed = schema.safeParse(result);

  return parsed.success ? parsed.data : {};
};
