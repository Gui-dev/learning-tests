import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'

import { useAuth } from '../hooks/use-auth'

interface IPrivateRouteProps {
  children: ReactNode
}

export const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const { user } = useAuth()

  console.log('USER: ', user)

  if (!user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
