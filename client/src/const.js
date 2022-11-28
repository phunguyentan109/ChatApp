import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from './views/Login'
import Chat from './views/Chat/Loader'

export const SESSION_AUTH = 'spwSession'

const allRouters = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
  {
    path: '/about',
    element: <div>About</div>,
  },
  {
    path: '*',
    element: <Navigate to='/chat' replace />,
  },
]

export const guestRouters = createBrowserRouter(
  allRouters.filter((r) => r.path === '/')
)

export const chatRouters = createBrowserRouter(
  allRouters.filter((r) => r.path !== '/')
)
