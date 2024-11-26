import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import z from 'zod';
import { parseSearchParams, serializeSearchParams } from './utils';

// React-router doesn't properly manage prev params, so we fix it by our own reference
let prevSearchParams = new URLSearchParams(window.location.search);

export const useSafeSearchParams = <
  Schema extends z.ZodSchema<Record<string, any>>,
>(
  schema: Schema,
) => {
  type ActionOrValue =
    | ((prev: z.infer<Schema>) => z.infer<Schema>)
    | z.infer<Schema>;

  const location = useLocation();

  useEffect(() => {
    prevSearchParams = new URLSearchParams(location.search);
  }, [location]);

  // Don't use it directly without `useSafeSearchParams` wrapper
  const [searchParams, setSearchParams] = useSearchParams();

  const state: z.infer<Schema> = useMemo(
    () => parseSearchParams(searchParams, schema),
    [searchParams, schema],
  );

  const setState = useCallback(
    (actionOrValue: ActionOrValue) => {
      const value =
        typeof actionOrValue === 'function'
          ? actionOrValue(parseSearchParams(prevSearchParams, schema))
          : actionOrValue;

      setSearchParams(serializeSearchParams(value));
    },
    [schema],
  );

  return [state, setState] as const;
};
