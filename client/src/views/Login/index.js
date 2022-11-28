import { useState } from 'react'
import './style.scss'
import { useDispatch } from 'react-redux'
import { logInAction } from 'redux/action'

export default function Login(props) {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    room: '',
    name: '',
  })

  const hdChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target?.name]: e.target?.value }))
  }

  const hdSubmit = () => {
    dispatch(logInAction({ ...form }))
  }

  return (
    <div className='centered-form'>
      <div className='centered-form__form'>
        <form onSubmit={hdSubmit}>
          <div className='form-field'>
            <h3>Join a Chat</h3>
          </div>
          <div className='form-field'>
            <label>Display name</label>
            <input
              type='text'
              autoFocus
              name='name'
              value={form.name}
              onChange={hdChange}
            />
          </div>
          <div className='form-field'>
            <label>Room name</label>
            <input
              name='room'
              type='text'
              value={form.room}
              onChange={hdChange}
            />
          </div>
          <div className='form-field'>
            <button>Join</button>
          </div>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {}
