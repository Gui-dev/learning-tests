import { describe, expect, it } from 'vitest'
import { LoginForm } from '../login-form'
import { AuthProvider } from '../../contexts/auth-context'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

describe('<LoginForm />', () => {
  it('should be able login with correct credentials', async () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    )

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    })

    fireEvent.change(screen.getByPlaceholderText(/senha/i), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/Bem-vindo, test@example.com/i)
      ).toBeInTheDocument()
    })
  })

  it('should not be able login with incorrect credentials', async () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    )

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'wrong@example.com' },
    })

    fireEvent.change(screen.getByPlaceholderText(/senha/i), {
      target: { value: 'wrong-password' },
    })

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.queryByText(/bem-vindo/i)).not.toBeInTheDocument()
    })
  })

  it('should be able show loading when login', async () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    )

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    })

    fireEvent.change(screen.getByPlaceholderText(/senha/i), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    expect(screen.getByText(/carregando/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(
        screen.getByText(/Bem-vindo, test@example.com/i)
      ).toBeInTheDocument()
    })
  })

  it('should be able show button disabled when loading', async () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    )

    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByPlaceholderText(/senha/i)
    const button = screen.getByRole('button', { name: /entrar/i })

    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    })

    fireEvent.change(passwordInput, {
      target: { value: '123456' },
    })

    fireEvent.click(button)

    expect(button).toBeDisabled()

    await waitFor(() => {
      expect(screen.getByText(/bem-vindo/i)).toBeInTheDocument()
    })
  })

  it('should be able login and logout correctly', async () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    )

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    })

    fireEvent.change(screen.getByPlaceholderText(/senha/i), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(screen.getByText(/Bem-vindo/i)).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /sair/i }))

    await waitFor(() => {
      expect(screen.queryByText(/Bem-vindo/i)).not.toBeInTheDocument()
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /entrar/i })
      ).toBeInTheDocument()
    })
  })
})
