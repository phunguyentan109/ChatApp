import React, { useEffect, useState } from 'react'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { initSocketAction, sendMessageAction } from './slice/action'
import { selectMessages } from './slice/selector'
import { format } from 'date-fns'

export default function Chat() {
  const dispatch = useDispatch()
  const { messages, users } = useSelector(selectMessages)

  const [message, setMessage] = useState('')

  useEffect(() => {
    dispatch(initSocketAction())
  }, [dispatch])

  const hdSubmit = (e) => {
    e.preventDefault()

    if (message.trim()) {
      dispatch(sendMessageAction({ message: message.trim() }))
      setMessage('')
    }
  }

  return (
    <div className='chat'>
      <div className='chat__sidebar'>
        <h3>People</h3>
        <div id='users'>
          {users.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </div>
      </div>

      <div className='chat__main'>
        <ol id='messages' className='chat__messages'>
          {messages.map((ms) => (
            <li key={ms.createdAt} className='message'>
              <div className='message__title'>
                <h4>{ms.from}</h4>
                <span>{format(ms.createdAt, 'H:mm a')}</span>
              </div>
              <div className='message__body'>
                <p>{ms.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className='chat__footer'>
          <form id='message-form' onSubmit={hdSubmit}>
            <input
              type='text'
              name='message'
              placeholder='Message'
              autoFocus
              autoComplete='off'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button>Send</button>
          </form>
          <button id='send-location'>Send location</button>
        </div>
      </div>
    </div>
  )
}
