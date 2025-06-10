import React, {
  createContext,
  useState,
  useContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";

const AuthContext = createContext<
  | {
      user: string | null;
      login: (user: string) => void;
      logout: () => void;
      token: string | null;
      setToken: Dispatch<SetStateAction<string | null>>;
      authenticated: boolean;
      loading: boolean;
    }
  | undefined
>(undefined);

export const AuthenticationProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Check for token in localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setAuthenticated(true);
    }
    setLoading(false); // Mark loading as complete
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      setAuthenticated(false);
    }
  }, [token]);

  const login = (user: string) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, token, setToken, authenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthenticationProvider");
  }
  return context;
};
