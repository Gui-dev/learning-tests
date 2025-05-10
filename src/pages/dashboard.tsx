import { useAuth } from '../hooks/use-auth'

export const Dashboard = () => {
  const { logout, user } = useAuth()

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
