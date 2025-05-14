import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AuthContext, type IUserProps } from '../../contexts/auth-context'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from '../private-route'
import { Dashboard } from '../../pages/dashboard'
import { LoginForm } from '../login-form'

describe('<PrivateRoute />', () => {
  const renderWithAuth = (
    user: IUserProps | null,
    initialRoute = '/dashboard'
  ) => {
    return render(
      <AuthContext.Provider
        value={{
          user,
          login: vi.fn(),
          logout: vi.fn(),
          loading: false,
          error: null,
        }}
      >
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    )
  }

  it('should render the protected route when user is authenticated', () => {
    renderWithAuth({ email: 'test@example.com' })

    expect(
      screen.getByRole('heading', { name: /dashboard/i })
    ).toBeInTheDocument()
  })

  it('should redirect to login if user is not authenticated', () => {
    renderWithAuth(null)

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
  })
})
