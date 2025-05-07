import { useEffect, useState } from "react"
import { fetchUsers } from "../services/api"

interface IUser {
  id: number
  name: string
  email: string
  username: string
}

interface IUserProps {
  id: number
}

export const User = ({ id }: IUserProps) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers(id).then(response => setUser(response)).catch(error => setError(error.message))
  }, [id])

  if (error) return <div role="alert">Erro: {error}</div>
  if (!user) return <div>Carregando...</div>


  return (
    <div>{user?.name}</div>
  )
}
