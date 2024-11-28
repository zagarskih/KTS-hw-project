import axios from 'axios';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const transport = async <ResponseT>(
  url: string,
  options?: {
    searchParams?: Record<string, string | undefined>;
    body?: Record<string, unknown>;
    method?: 'get' | 'post' | 'put';
    signal?: AbortSignal;
    headers?: Record<string, string | undefined>;
  },
): Promise<{ data: ResponseT | null; isAborted: boolean }> => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  try {
    const urlInstance = new URL(`${BASE_URL}${url}`);

    const response = await axios({
      method: options?.method ?? 'get',
      url: urlInstance.toString(),
      signal: options?.signal,
      params: options?.searchParams,
      data: options?.body,
      headers: defaultHeaders,
    });
    return { data: response.data as ResponseT, isAborted: false };
  } catch (e) {
    const isAborted = axios.isCancel(e);
    return { data: null, isAborted };
  }
};
