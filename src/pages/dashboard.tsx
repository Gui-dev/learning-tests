import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'
import { useEffect } from 'react'

export const Dashboard = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  if (!user) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <h1>Dashboard</h1>
      <p>Bem-vindo {user?.email}</p>
      <button type="button" onClick={logout}>
        Sair
      </button>
    </>
  )
}
