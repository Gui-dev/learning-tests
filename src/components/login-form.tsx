import { type FormEvent, useState } from 'react'
import { useAuth } from '../hooks/use-auth'

export const LoginForm = () => {
  const { login, loading, logout, error, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login(email, password)
  }

  const handleLogout = () => {
    logout()
  }

  if (user) {
    return (
      <>
        <p>Bem-vindo, {user.email}</p>
        <button type="button" onClick={handleLogout}>
          Sair
        </button>
      </>
    )
  }

  console.log('ERROR: ', error)

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Carregando...' : 'Entrar'}
      </button>

      {error && <p role="alert">{error}</p>}
    </form>
  )
}
