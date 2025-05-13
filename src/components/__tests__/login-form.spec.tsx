import { describe, expect, it, vi } from 'vitest'
import { LoginForm } from '../login-form'
import { AuthContext, AuthProvider } from '../../contexts/auth-context'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('<LoginForm />', () => {
  const loginMock = vi.fn()
  const defaultContext = {
    user: null,
    login: loginMock,
    logout: vi.fn(),
    loading: false,
    error: null,
  }

  const renderForm = (contextOverrides = {}) => {
    const context = { ...defaultContext, ...contextOverrides }
    return render(
      <MemoryRouter>
        <AuthContext.Provider value={context}>
          <LoginForm />
        </AuthContext.Provider>
      </MemoryRouter>
    )
  }

  it('should be able renders email and password inputs and submit button', async () => {
    renderForm()

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })
})
