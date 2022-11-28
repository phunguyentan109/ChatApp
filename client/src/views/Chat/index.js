import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

Chat.propTypes = {}

export default function Chat(props) {
  return (
    <div className='chat'>
      <div className='chat__sidebar'>
        <h3>People</h3>
        <div id='users'></div>
      </div>

      <div className='chat__main'>
        <ol id='messages' className='chat__messages'></ol>

        <div className='chat__footer'>
          <form id='message-form'>
            <input
              type='text'
              name='message'
              placeholder='Message'
              autoFocus
              autoComplete='off'
            />
            <button>Send</button>
          </form>
          <button id='send-location'>Send location</button>
        </div>
      </div>
    </div>
  )
}
