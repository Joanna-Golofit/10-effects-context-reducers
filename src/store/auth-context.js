import { createContext } from 'react'

const AuthContext = createContext({
  //it's just a dummy information, mainly showing what properties your object has, and vsc will show it in 'autocompletion'
  isLoggedIn: false,
  onLogout: () => {}
})

export default AuthContext