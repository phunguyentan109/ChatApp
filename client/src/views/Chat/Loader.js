import { lazy, Suspense } from 'react'

Loader.propTypes = {}

export default function Loader(props) {
  const View = lazy(() => import('./index'))

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <View {...props} />
    </Suspense>
  )
}
