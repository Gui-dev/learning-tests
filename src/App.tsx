import { LoginForm } from './components/login-form'
import { User } from './components/user'
import { AuthProvider } from './contexts/auth-context'

function App() {
  return (
    <AuthProvider>
      <h1>Hello World</h1>
      <User id={1} />
      <LoginForm />
    </AuthProvider>
  )
}

export default App
