import axios from 'axios';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const transport = async <ResponseT>(
  url: string,
  options?: {
    searchParams?: Record<string, string>;
    method?: 'get';
  },
) => {
  try {
    const urlInstance = new URL(`${BASE_URL}${url}?${new URLSearchParams(options?.searchParams)}`);
    const response = await axios[options?.method ?? 'get'](urlInstance.toString());
    return response.data as ResponseT;
  } catch {
    return null;
  }
};
