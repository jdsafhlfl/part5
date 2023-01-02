/* eslint-disable linebreak-style */
import CorrectNotification from './CorrectNotification'
import ErrorNotification from './ErrorNotification'

const LoginForm = (props) => {
  return (
    <div>
      <h2>log in to the application</h2>
      <CorrectNotification message={props.correctMessage} />
      <ErrorNotification message={props.errorMessage} />
      <form onSubmit={props.handleLogin}>
        <div>
                    username
          <input
            value={props.username}
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
                    password
          <input
            type="password"
            value={props.password}
            onChange={props.handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm