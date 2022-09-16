import React from "react";

import { User } from "./api";

export type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => void;
};
export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

type AuthContextStateType =
  | {
      isAuthenticated: true;
      user: User;
    }
  | {
      isAuthenticated: false;
      user: null;
    };

export function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return { ...context, isAuthenticated: !!context.user } as Omit<
    AuthContextType,
    "user"
  > &
    AuthContextStateType;
}
