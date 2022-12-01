import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import { ROUTE_PERMISSION, SESSION_AUTH } from '../const'

const sagaMiddleware = createSagaMiddleware()

const INIT_VALUES = {
  name: '',
  room: '',
  roles: { [ROUTE_PERMISSION.login]: true },
}

const appSlice = createSlice({
  name: 'app',
  initialState: INIT_VALUES,
  reducers: {
    join: (state, action) => {
      let authValue =
        action.payload ||
        JSON.parse(sessionStorage.getItem(SESSION_AUTH)) ||
        INIT_VALUES

      state.name = authValue?.name
      state.room = authValue?.room
      state.roles = authValue?.roles
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

function createReducer(asyncReducers) {
  return combineReducers({
    app: appSlice.reducer,
    ...asyncReducers,
  })
}

store.asyncReducers = {}
store.injectReducer = (key, asyncReducer) => {
  store.asyncReducers[key] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
}

sagaMiddleware.run(rootSaga)
