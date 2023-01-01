/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';

const AuthContext = createContext({} as any);

export function AuthProvider({ children }: any) {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem('persist') as any) || false
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
