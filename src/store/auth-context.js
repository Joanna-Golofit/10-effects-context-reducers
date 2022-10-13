import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext({
  //it's just a dummy information, mainly showing what properties your object has, and vsc will show it in 'autocompletion'
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
})

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let storedLoggedInfo = localStorage.getItem("isLoggedIn");
    storedLoggedInfo === "1" && setIsLoggedIn(true);
  }, [])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1")
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false);
  };


  return <AuthContext.Provider value={{
    isLoggedIn: isLoggedIn,
    onLogout: logoutHandler,
    onLogin: loginHandler
  }}> {props.children} </AuthContext.Provider>
}

export default AuthContext