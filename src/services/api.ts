

export const fetchUsers = async (id: number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  if (!response.ok) throw new Error('User not found')
  return response.json()
}
