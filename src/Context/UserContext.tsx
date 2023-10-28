import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};
type UserToken = {
  iat: number;
  sub: UserType;
  token: string;
};

const UserContext = createContext<{
  user: UserToken | null;
  setUser: React.Dispatch<React.SetStateAction<UserToken | null>>;
}>({ user: null, setUser: () => {} });

export const useUser = () => {
  return useContext(UserContext);
};
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserToken | null>(null);

  useEffect(() => {
    const getTokenAndDecode = async () => {
      const tokenString = await SecureStore.getItemAsync("userToken");
      if (tokenString) {
        try {
          const decoded = jwtDecode(JSON.parse(tokenString).token) as UserToken;
          setUser({ sub: decoded.sub, iat: decoded.iat, token: tokenString });
        } catch (error) {
          console.error("JWT decoding failed:", error);
        }
      }
    };

    getTokenAndDecode();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
