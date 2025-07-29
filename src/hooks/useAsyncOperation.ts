import { useState, useCallback } from 'react';

interface AsyncOperationState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  retryCount: number;
}

interface UseAsyncOperationOptions {
  maxRetries?: number;
  retryDelay?: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useAsyncOperation<T>(
  operation: () => Promise<T>,
  options: UseAsyncOperationOptions = {}
) {
  const { maxRetries = 3, retryDelay = 1000, onSuccess, onError } = options;
  
  const [state, setState] = useState<AsyncOperationState<T>>({
    data: null,
    loading: false,
    error: null,
    retryCount: 0
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    let lastError: string = '';
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await operation();
        setState({
          data: result,
          loading: false,
          error: null,
          retryCount: attempt
        });
        
        onSuccess?.();
        return result;
      } catch (error) {
        lastError = error instanceof Error ? error.message : 'An unknown error occurred';
        
        // If this isn't the last attempt, wait before retrying
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
        }
      }
    }

    // All retries failed
    setState(prev => ({
      ...prev,
      loading: false,
      error: lastError,
      retryCount: maxRetries
    }));
    
    onError?.(lastError);
    throw new Error(lastError);
  }, [operation, maxRetries, retryDelay, onSuccess, onError]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      retryCount: 0
    });
  }, []);

  const retry = useCallback(() => {
    return execute();
  }, [execute]);

  return {
    ...state,
    execute,
    reset,
    retry,
    canRetry: state.retryCount < maxRetries && !state.loading
  };
}