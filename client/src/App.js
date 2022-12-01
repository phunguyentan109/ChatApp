import React, { useEffect, useMemo } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { allRouters } from './const'
import { useDispatch, useSelector } from 'react-redux'
import { selectApp } from 'redux/selector'
import { join } from 'redux/store'

function App() {
  const user = useSelector(selectApp)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(join())
  }, [dispatch])

  const routes = useMemo(() => {
    let permitRoutes = allRouters.filter((r) => user.roles?.[r.permission])

    let redirectRoute = permitRoutes.find((r) => r.notFoundRedirect)
    if (redirectRoute)
      permitRoutes.push({
        path: '*',
        element: <Navigate to={redirectRoute.path} />,
      })

    return permitRoutes.map(({ path, element }) => ({ path, element }))
  }, [user.roles])

  return routes.length === 0 ? null : (
    <RouterProvider router={createBrowserRouter(routes)} />
  )
}

export default App
