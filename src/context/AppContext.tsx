import { Router, useRouter } from "next/dist/client/router";
import { createContext, useContext, useState } from "react";
import { LanguageCode, LanguageInfos } from "../common/Constant";
import { userService } from "../services/userService";

type AppContextType = {
  changeLanguage: (LanguageCode: string) => void;
  mobileMenuStatus: boolean;
  toggleMobileMenu: () => void;
  jwtToken: string;
  setJwtToken: (token: string) => void;
  login: (email: string, password: string) => any;
  logout: () => void;
  isLogged: boolean;
  setIsLogged: (log: boolean) => void;
  register: (email: string, password: string) => any;
};

const AppContext = createContext<AppContextType>({
  changeLanguage: () => {},
  mobileMenuStatus: false,
  toggleMobileMenu: () => {},
  jwtToken: "",
  setJwtToken: () => {},
  login: () => {},
  logout: () => {},
  isLogged: false,
  setIsLogged: () => {},
  register: () => {},
});

export function AppWrapper({ children }) {
  const Router = useRouter();
  const { pathname, asPath, query } = Router;
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [jwtToken, setJwtToken] = useState("");

  const [isLogged, setIsLogged] = useState(false);
  const changeLanguage = (languageCode: string) => {
    Router.push({ pathname, query }, asPath, { locale: languageCode });
  };

  const login = async (email: string, password: string) => {
    const response = await userService.login(email, password);
    return response;
  };

  const register = async (email: string, password: string) => {
    const response = await userService.register(email, password);
    return response;
  };

  const toggleMobileMenu = () => {
    setMobileMenuStatus(!mobileMenuStatus);
    console.log(mobileMenuStatus);
  };

  const logout = userService.logout;

  const sharedState = {
    changeLanguage,
    mobileMenuStatus,
    toggleMobileMenu,
    setJwtToken,
    jwtToken,
    login,
    logout,
    setIsLogged,
    isLogged,
    register,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
