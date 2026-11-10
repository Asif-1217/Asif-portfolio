import { useState, useEffect, useCallback } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface UseApiResult<T> {
  data: T | null;
  status: Status;
  error: string | null;
  refetch: () => void;
}

export function useApi<T>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList = []
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
      setStatus('success');
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'An unknown error occurred';
      setError(msg);
      setStatus('error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, status, error, refetch: fetch };
}
