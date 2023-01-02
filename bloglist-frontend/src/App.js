/* eslint-disable linebreak-style */
import { useState, useEffect, useRef } from 'react'

import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'

import Togglable from './components/ToggleLabel'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [correctMessage, setCorrectMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setCorrectMessage('valid login! welcome!')
      setUser(user)
      setTimeout(() => {
        setCorrectMessage('')
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage('')

      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setCorrectMessage('Log out successfully!')
    setTimeout(() => {
      setCorrectMessage('')
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <LoginForm username={username} password={password} correctMessage={correctMessage} errorMessage={errorMessage} handleLogin={handleLogin} handleUsernameChange={({ target }) => setUsername(target.value)} handlePasswordChange={({ target }) => setPassword(target.value)} />
      </div>
    )
  }


  return (
    <Togglable ref={blogFormRef} buttonLabel="create new blog" user={user} blogs={blogs} setBlogs={setBlogs} handleLogout={handleLogout} correctMessage={correctMessage} errorMessage={errorMessage} >
      <BlogForm blogFormRef={blogFormRef} user={user} blogs={blogs} setBlogs={setBlogs} setUser={setUser} correctMessage={correctMessage} errorMessage={errorMessage} setCorrectMessage={setCorrectMessage} setErrorMessage={setErrorMessage} />
    </Togglable>
  )
}


export default App
