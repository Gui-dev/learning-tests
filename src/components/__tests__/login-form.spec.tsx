import { describe, expect, it, vi } from 'vitest'
import { LoginForm } from '../login-form'
import { AuthContext } from '../../contexts/auth-context'
import { fireEvent, render, screen } from '@testing-library/react'
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

  it('should be able calls login function on form submit', async () => {
    renderForm()

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    })

    fireEvent.change(screen.getByPlaceholderText(/senha/i), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    expect(loginMock).toHaveBeenCalledWith('test@example.com', '123456')
  })

  it('should be able disables button when loading is true', async () => {
    renderForm({ loading: true })

    expect(screen.getByRole('button', { name: /carregando/i })).toBeDisabled()
  })

  it('should be able show erro message if login fails', () => {
    renderForm({ error: 'Credentials do not match' })

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Credentials do not match'
    )
  })
})
