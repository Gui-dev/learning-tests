import { describe, expect, it, vi } from 'vitest'
import * as api from './../../services/api'
import { render, screen, waitFor } from '@testing-library/react'
import { User } from '../user'

describe('<User id={1} />', () => {
  it('should be able renders user name', async () => {
    const mockUser = {
      id: 1,
      name: 'Leanne Graham',
      email: '2V2lW@example.com',
      username: 'johndoe',
    }

    vi.spyOn(api, 'fetchUsers').mockResolvedValue(mockUser)
    render(<User id={1} />)

    await waitFor(() => {
      expect(screen.getByText(/Leanne Graham/)).toBeInTheDocument()
    })
  })

  it('should be able renders error message', async () => {
    vi.spyOn(api, 'fetchUsers').mockRejectedValue(new Error('User not found'))

    render(<User id={999} />)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Erro: User not found'
      )
    })
  })
})
