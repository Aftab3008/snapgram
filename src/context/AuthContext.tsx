import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
// import { set } from 'zod';
import { IContextType, IUser } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";
import { useNavigate } from "react-router-dom";
// import Loader from "@/components/shared/Loader";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isAuthenticated: false,
  isLoading: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};
const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // console.log(user);
  const checkAuthUser = useCallback(async () => {
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,

          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      } else {
        setIsAuthenticated(false);
        localStorage.setItem("cookieFallback", "[]");
        navigate("/sign-in");
      }
      return false;
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      localStorage.setItem("cookieFallback", "[]");
      navigate("/sign-up");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkAuthUser();
  }, []);

  // if (isLoading) {
  //   return <Loader />;
  // }
  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      setUser,
      setIsAuthenticated,
      setIsLoading,
      checkAuthUser,
    }),
    [
      user,
      isAuthenticated,
      isLoading,
      setUser,
      setIsAuthenticated,
      setIsLoading,
      checkAuthUser,
    ]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);
