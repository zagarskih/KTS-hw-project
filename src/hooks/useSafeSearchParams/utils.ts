import { z } from 'zod';

const checkIsPrimitive = (v: unknown) => typeof v === 'string' || typeof v === 'number';

export const serializeSearchParams = (value: Record<string, unknown> | null) => {
  const serialized: Record<string, string> = {};

  Object.entries(value ?? {}).forEach((entry) => {
    const [key, value] = entry;
    try {
      const isPrimitive = checkIsPrimitive(value);
      serialized[key] = isPrimitive ? String(value) : JSON.stringify(value);
    } catch {
      // Do nothing because can't searialize
    }
  });

  return new URLSearchParams(serialized);
};

export const parseSearchParams = <Schema extends z.ZodSchema>(searchParams: URLSearchParams, schema: Schema) => {
  const result: Record<string, unknown> = {};

  searchParams.forEach((value, key) => {
    try {
      const parsed = JSON.parse(value);
      result[key] = typeof parsed === 'number' ? value : parsed;
    } catch {
      result[key] = value;
    }
  });

  const parsed = schema.safeParse(result);

  return parsed.success ? parsed.data : {};
};
