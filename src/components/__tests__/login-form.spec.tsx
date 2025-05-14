import { describe, expect, it, vi } from 'vitest'
import { LoginForm } from '../login-form'
import { AuthContext } from '../../contexts/auth-context'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from '../../pages/dashboard'

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

  it('should not be able render form if user already logged in', async () => {
    const mockedUser = { email: 'test@example.com' }

    render(
      <AuthContext.Provider
        value={{
          user: mockedUser,
          login: vi.fn(),
          logout: vi.fn(),
          loading: false,
          error: null,
        }}
      >
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
    })

    expect(screen.queryByPlaceholderText(/email/i)).not.toBeInTheDocument()
  })
})
