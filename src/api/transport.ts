import axios from 'axios';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const transport = async <ResponseT>(
  url: string,
  options?: {
    searchParams?: Record<string, string | undefined>;
    method?: 'get';
    signal?: AbortSignal;
  },
) => {
  const searchParams = new URLSearchParams(
    Object.entries(options?.searchParams ?? {})
      .map(([key, value]) => (value === undefined ? undefined : [key, value]))
      .filter((pair) => pair !== undefined),
  );

  try {
    const urlInstance = new URL(`${BASE_URL}${url}`);
    const response = await axios[options?.method ?? 'get'](urlInstance.toString(), {
      signal: options?.signal,
      params: options?.searchParams,
    });
    return response.data as ResponseT;
  } catch {
    return null;
  }
};
