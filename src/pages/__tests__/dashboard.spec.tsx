import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AuthContext } from '../../contexts/auth-context'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from '../dashboard'

describe('<Dashboard />', () => {
  const mockedUser = { email: 'test@example.com' }

  const renderWithRouter = (
    contextOverrides = {},
    initialRoute = '/dashboard'
  ) => {
    const context = {
      user: mockedUser,
      login: vi.fn(),
      logout: vi.fn(),
      loading: false,
      error: null,
      ...contextOverrides,
    }

    return {
      ...render(
        <AuthContext.Provider value={context}>
          <MemoryRouter initialEntries={[initialRoute]}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
      ),
      context,
    }
  }

  it('should be able display welcome message and logout button when user is logged in', async () => {
    renderWithRouter()

    expect(
      screen.getByRole('heading', { name: /dashboard/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/bem-vindo/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sair/i })).toBeInTheDocument()
  })

  it('should call logout when clicking on button', async () => {
    const { context } = renderWithRouter()

    fireEvent.click(screen.getByRole('button', { name: /sair/i }))

    await waitFor(() => {
      expect(context.logout).toHaveBeenCalled()
    })
  })
})
