import { type FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../hooks/use-auth'
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
  const { login, loading, error, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login(email, password)
  }

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

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
