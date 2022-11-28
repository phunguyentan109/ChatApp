import { takeLatest, take, call, put, cancelled } from 'redux-saga/effects'
import { closeSocketAction, initSocketAction } from './action'
import { io } from 'socket.io-client'
import { eventChannel } from 'redux-saga'
import { receiveMessage } from './index'

function createSocketChannel(socket, user) {
  return eventChannel((emit) => {
    const onConnect = () => socket.emit('join', user)

    const onReceiveMessage = (message) => emit(receiveMessage(message))

    const onError = (err) => emit(err)

    socket.on('connect', onConnect)
    socket.on('error', onError)
    socket.on('newMessage', onReceiveMessage)

    return () => {
      socket.removeAllListeners()
    }
  })
}

function* initActionSaga(data) {
  const socket = io('http://locahost:8080')

  const socketChannel = yield call(createSocketChannel, socket, data)

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
}

export default function* chatSaga() {
  yield takeLatest(initSocketAction, initActionSaga)
}
