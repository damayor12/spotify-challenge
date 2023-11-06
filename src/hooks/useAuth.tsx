import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

import { getAuthToken } from '../utils/utils';
import { authorize, getRefreshToken, getToken } from '../services/auth';

const LoggedInContext = createContext<
  | {
      isLoggedIn: boolean;
      token: string;
      login: () => void;
      logout: () => void;
    }
  | undefined
>(undefined);

const LoggedInProvider = ({ children }: { children: React.ReactNode }) => {
  /******************************* useState ***********************************/
  const tokensData = getAuthToken();
  const [isLoggedIn, setIsLoggedIn] = useState(!!tokensData || false);
  const [token, setToken] = useState(tokensData?.access_token || '');
  const [refreshToken, setRefreshToken] = useState<string>(
    tokensData?.refresh_token || '',
  );
  const [expiry, setExpiry] = useState(tokensData?.expires_in || 0);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const codeParam = `${searchParams.get('code')}`;

  /******************************* useEffect ***********************************/

  useEffect(() => {
    (async () => {
      if (searchParams.has('code')) {
        const fetchedTokens = await getToken(codeParam);
        searchParams.delete('code');
        window.history.pushState({}, '', '/');

        if (fetchedTokens) {
          const expiryInMs = new Date().getTime() + fetchedTokens.expires_in;
          setToken(fetchedTokens.access_token);
          setRefreshToken(fetchedTokens.refresh_token);

          setExpiry(expiryInMs);

          setIsLoggedIn(true);
        }
      }
    })();
  }, [codeParam]);

  useEffect(() => {
    if (!refreshToken || !expiry) return;

    (async () => {
      if (new Date().getTime() > expiry) {
        console.log('refresh func fired');
        const fetchedTokens = await getRefreshToken(refreshToken);

        if (fetchedTokens) {
          const expiryInMs = new Date().getTime() + fetchedTokens.expires_in;
          setToken(fetchedTokens.access_token);
          setRefreshToken(fetchedTokens.refresh_token);
          setExpiry(expiryInMs);
          setIsLoggedIn(true);
        }
      }
    })();
  }, [expiry, refreshToken]);

  /******************************* helpers ***********************************/

  const login = async () => {
    await authorize();
  };

  const logout = async () => {
    window.localStorage.clear();
    setIsLoggedIn(false);
    setToken('');
    setRefreshToken('');
    setExpiry(0);
  };

  const memoizedProviderValue = useMemo(
    () => ({
      isLoggedIn,
      token,
      login,
      logout,
    }),
    [isLoggedIn, token, login, logout],
  );

  return (
    <LoggedInContext.Provider value={memoizedProviderValue}>
      {children}
    </LoggedInContext.Provider>
  );
};

function useAuth() {
  const context = useContext(LoggedInContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContext Provider');
  }

  return context;
}

export { useAuth, LoggedInProvider };
