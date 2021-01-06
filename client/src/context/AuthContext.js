import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <AuthContext.Provider value={(isLoggedIn, setIsLoggedIn)}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
