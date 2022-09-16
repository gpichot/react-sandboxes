import React from "react";

import "./styles.css";

import { useAuthContext, AuthContext } from "./context";
import { signIn, User } from "./api";

function SignInButton() {
  const { signIn } = useAuthContext();

  return (
    <button onClick={() => signIn("admin@test.com", "admin")}>Sign in</button>
  );
}
function SignOutButton() {
  const { signOut } = useAuthContext();
  return <button onClick={signOut}>Sign out </button>;
}

function Nav() {
  const { user, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <SignInButton />;
  }

  return (
    <div>
      Logged in as {user.id}
      <br />
      <SignOutButton />
    </div>
  );
}

function Dashboard() {
  const { user, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <p>You should login first</p>;
  }
  return <p>My Dashboard ({user.id})</p>;
}

export default function App() {
  const [user, setUser] = React.useState<User | null>(null);

  const context = {
    user,
    signIn: async (email: string, password: string) => {
      const user = await signIn(email, password);
      setUser(user);
      return user;
    },
    signOut: () => {
      setUser(null);
    },
  };

  return (
    <AuthContext.Provider value={context}>
      <Nav />
      <Dashboard />
    </AuthContext.Provider>
  );
}
