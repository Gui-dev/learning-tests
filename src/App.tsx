import { LoginForm } from './components/login-form'
import { AuthProvider } from './contexts/auth-context'

function App() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  )
}

export default App
