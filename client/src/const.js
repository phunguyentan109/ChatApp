import { createBrowserRouter } from 'react-router-dom'
import Login from './Login'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: 'about',
    element: <div>About</div>,
  },
])
