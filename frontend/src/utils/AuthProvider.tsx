import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react'
import { authProvider } from './auth'

interface AuthContextType {
  user: string
  signin: (loginField: LoginField) => void
  signout: (callback: VoidFunction) => void
}

export interface LoginField {
  username: string
  password: string
}

let AuthContext = createContext<AuthContextType>(null!)

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  let [user, setUser] = useState<any>(null)

  let signin = (loginField: LoginField) => {
    const isValid = authProvider.signin()
    if (isValid) {
      setUser(loginField.username)
    }
    return
  }

  let signout = () => {
    const isLogout = authProvider.signout()
    if (isLogout) {
      setUser(null)
    }
  }

  let value = { user, signin, signout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
