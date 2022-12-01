import { lazy, Suspense } from 'react'
import chatReducer from './slice'
import { store } from 'redux/store'

export default function Loader(props) {
  const View = lazy(() =>
    import('./index').then((view) => {
      store.injectReducer('chat', chatReducer)

      return view
    })
  )

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <View {...props} />
    </Suspense>
  )
}
