import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import counterReducer from '../features/counter/counterSlice'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)
