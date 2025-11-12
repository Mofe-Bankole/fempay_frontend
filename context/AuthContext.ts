import { AuthContextValue, Session, SignInInput, SignUpInput } from '@/types/types';
import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext<AuthContextValue | null>(null);

const API_BASE_URL = 'http://localhost:78753';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    const instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 20000,
      headers: { 'Content-Type': 'application/json' },
    });
    return instance;
  }, []);

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const setAuthHeader = useCallback(
    (token?: string) => {
      if (token) {
        client.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        delete client.defaults.headers.common.Authorization;
      }
    },
    [client]
  );

  const signUp = useCallback(
    async (input: SignUpInput) => {
      setLoading(true);
      setError(undefined);
      try {
        const { data } = await client.post('/signup', input);
        const nextSession: Session = {
          user: data?.user ?? null,
          accessToken: data?.accessToken,
          expiresAt: data?.expiresAt,
          ...data,
        };
        setSession(nextSession);
        setAuthHeader(nextSession.accessToken);
        return nextSession;
      } catch (e: any) {
        const message = e?.response?.data?.message || e?.message || 'Signup Failed';
        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [client, setAuthHeader]
  );

  const signIn = useCallback(
    async (input: SignInInput) => {
      setLoading(true);
      setError(undefined);
      try {
        const { data } = await client.post('api/v1/create/user/signin', input);
        const nextSession: Session = {
          user: data?.user ?? null,
          accessToken: data?.accessToken,
          expiresAt: data?.expiresAt,
          ...data,
        };
        setSession(nextSession);
        setAuthHeader(nextSession.accessToken);
        return nextSession;
      } catch (e: any) {
        const message = e?.response?.data?.message || e?.message || 'Signin failed';
        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [client, setAuthHeader]
  );

  const signOut = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      // Optional: call a signout endpoint if backend supports it
      // await client.post('/signout');
    } catch {
      // ignore network errors on signout
    } finally {
      setSession(null);
      setAuthHeader(undefined);
      setLoading(false);
    }
  }, [setAuthHeader]);

  const fetchSession = useCallback(async (): Promise<Session | null> => {
    setLoading(true);
    setError(undefined);
    try {
      const { data } = await client.get('/session');
      const nextSession: Session = {
        user: data?.user ?? null,
        accessToken: data?.accessToken,
        expiresAt: data?.expiresAt,
        ...data,
      };
      setSession(nextSession);
      setAuthHeader(nextSession.accessToken);
      return nextSession;
    } catch {
      // If unauthorized, clear session silently
      setSession(null);
      setAuthHeader(undefined);
      return null;
    } finally {
      setLoading(false);
    }
  }, [client, setAuthHeader]);

  const submitKyc = useCallback(
    async (payload: Record<string, any>) => {
      setLoading(true);
      setError(undefined);
      try {
        const { data } = await client.post('/kyc', payload);
        return data;
      } catch (e: any) {
        const message = e?.response?.data?.message || e?.message || 'KYC submission failed';
        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [client]
  );

  // On mount: try to hydrate session from backend (cookie or token-based)
  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      loading,
      error,
      signUp,
      signIn,
      signOut,
      fetchSession,
      submitKyc,
      client,
    }),
    [client, error, fetchSession, loading, session, signIn, signOut, signUp, submitKyc]
  );

  return React.createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}



