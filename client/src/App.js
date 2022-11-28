import React, { useEffect, useMemo } from 'react'
import { RouterProvider } from 'react-router-dom'
import { guestRouters, chatRouters } from './const'
import { useSelector } from 'react-redux'
import { selectApp } from './redux/selector'

function App() {
  const user = useSelector(selectApp)

  const routes = useMemo(
    () => (!!(user.room && user.name) ? chatRouters : guestRouters),
    [user.name, user.room]
  )

  return <RouterProvider router={routes} />
}

export default App
