import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "entrepreneur" | "investor";
  avatar?: string;
  bio?: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const mockUsers: User[] = [
    {
      _id: "1",
      name: "Soha Test",
      email: "soha@test.com",
      role: "entrepreneur",
      avatar: "",
      bio: "Test Entrepreneur",
      company: "My Startup",
    },
    {
      _id: "2",
      name: "Alex Investor",
      email: "alex@investor.com",
      role: "investor",
      avatar: "",
      bio: "Angel Investor",
      company: "Stone Capital",
    },
  ];

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    const foundUser = mockUsers.find(
      (u) => u.email.toLowerCase().trim() === email.toLowerCase().trim(),
    );

    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      localStorage.setItem("token", "mock-token");
      setUser(foundUser);
      setIsLoading(false);
      return true;
    } else {
      setError("Invalid email or password");
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
