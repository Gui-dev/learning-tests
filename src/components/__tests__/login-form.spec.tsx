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
})
