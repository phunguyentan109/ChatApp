import PropTypes from 'prop-types'
import './style.scss'

Login.propTypes = {}

function Login(props) {
  return (
    <div className='centered-form'>
      <div className='centered-form__form'>
        <form>
          <div className='form-field'>
            <h3>Join a Chat</h3>
          </div>
          <div className='form-field'>
            <label>Display name</label>
            <input type='text' name='name' autoFocus />
          </div>
          <div className='form-field'>
            <label htmlFor='roomName'>Room name</label>
            <input name='roomName' id='roomName' type='text' />
          </div>
          <div className='form-field'>
            <button>Join</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
