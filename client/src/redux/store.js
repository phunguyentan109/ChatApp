import { configureStore, createSlice } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

const appSlice = createSlice({
  name: 'app',
  initialState: { name: '', room: '' },
  reducers: {
    join: (state, action) => {
      state.name = action.payload?.name || ''
      state.room = action.payload?.room || ''
    },
  },
})

export const { join } = appSlice.actions

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)
