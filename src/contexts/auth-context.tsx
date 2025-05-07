import { createContext, useCallback, useState } from 'react'

interface IUserProps {
  email: string
}

interface IAuthContextProps {
  user: IUserProps | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
  error: string | null
}

interface IAuthProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext<IAuthContextProps>(
  {} as IAuthContextProps
)

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUserProps | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    await new Promise(response => setTimeout(response, 500))

    if (email === 'test@example.com' && password === '123456') {
      setUser({ email })
    } else {
      setError('Credentials do not match')
    }

    setLoading(false)
  }, [])

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
