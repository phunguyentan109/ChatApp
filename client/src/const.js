import Login from 'views/Login'
import Chat from 'views/Chat/Loader'

export const SESSION_AUTH = 'spwSession'

export const ROUTE_PERMISSION = {
  login: 'perm.login',
  chat: 'perm.chat',
  about: 'perm.about',
}

export const allRouters = [
  {
    path: '/',
    element: <Login />,
    notFoundRedirect: true,
    permission: ROUTE_PERMISSION.login,
  },
  {
    path: '/chat',
    element: <Chat />,
    permission: ROUTE_PERMISSION.chat,
    notFoundRedirect: true,
  },
  {
    path: '/about',
    element: <div>About</div>,
    permission: ROUTE_PERMISSION.about,
  },
]

export const env = {
  restApi: process.env.REACT_APP_REST_API,
  socketApi: process.env.REACT_APP_SOCKET_API,
}
