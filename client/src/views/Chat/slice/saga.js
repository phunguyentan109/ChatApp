import { call, put, take, takeLatest, select } from 'redux-saga/effects'
import {
  closeSocketAction,
  initSocketAction,
  sendMessageAction,
} from './action'
import { io } from 'socket.io-client'
import { eventChannel } from 'redux-saga'
import { receiveMessage, updateUsers } from './index'
import { selectApp } from 'redux/selector'
import { env } from 'const'

function createSocketChannel(socket, user) {
  return eventChannel((emit) => {
    socket.on('connect', () => socket.emit('join', user))

    socket.on('error', (err) => emit(err))

    socket.on('newMessage', (message) => {
      emit(receiveMessage(message))
    })

    socket.on('updateUserList', (users) => {
      emit(updateUsers(users))
    })

    return () => {
      socket.removeAllListeners()
    }
  })
}

function* initSocketSaga() {
  try {
    const socket = io(env.socketApi || window.location.origin)

    const data = yield select(selectApp)
    const socketChannel = yield call(createSocketChannel, socket, data)

    yield takeLatest(sendMessageAction, function ({ payload }) {
      socket.emit('createMessage', {
        from: 'User',
        text: payload.message,
      })
    })

    yield takeLatest(closeSocketAction, function () {
      socketChannel.close()
      socket.close()
    })

    while (true) {
      try {
        const channelData = yield take(socketChannel)
        yield put(channelData)
      } catch (err) {
        console.error(`Socket error => ${err}`)
      }
    }
  } catch (e) {
    console.error(`Initital error => ${e}`)
  }
}

export default function* chatSaga() {
  yield takeLatest(initSocketAction, initSocketSaga)
}
