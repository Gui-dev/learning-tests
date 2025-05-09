import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { LoginForm } from './components/login-form'
import { AuthProvider } from './contexts/auth-context'
import { PrivateRoute } from './components/private-route'
import { Dashboard } from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
        <LoginForm />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
