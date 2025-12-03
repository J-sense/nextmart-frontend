import { getCurrentUser } from "@/src/services/auth";
import { UserType } from "@/src/types";
import { createContext, useContext, useEffect, useState } from "react";
type contextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
export const userContext = createContext<contextType | undefined>(undefined);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handleUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } finally {
        setIsLoading(false);
      }
    };
    handleUser();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </userContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
