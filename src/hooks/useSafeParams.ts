import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z, ZodSchema } from 'zod';

export const useSafeParams = <T extends ZodSchema>(schema: T, fallbackUrl: string): z.infer<T> | null => {
  const params = useParams();
  const navigate = useNavigate();

  const result = useMemo(() => schema.safeParse(params), [schema, params]);

  useEffect(() => {
    if (result.error) navigate(fallbackUrl, { replace: true });
  }, [result.error, fallbackUrl, navigate]);

  if (result.success) return result.data;

  return result.data ?? null;
};
