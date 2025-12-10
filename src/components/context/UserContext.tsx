import { getCurrentUser } from "@/src/services/auth";
import { UserType } from "@/src/types";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
interface IUserProviderValues {
  user: UserType | null;
  isLoading: boolean;
  setUser: (user: UserType | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
export const userContext = createContext<IUserProviderValues | undefined>(undefined);
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
  }, [isLoading]);

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
