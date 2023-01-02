import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [correctMessage, setCorrectMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [createBlogVisible, setCreateVisible] = useState(false)

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
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setCorrectMessage("valid login! welcome!")
      setTimeout(() => {
        setCorrectMessage('')
      }, 5000)
    } catch (exception) {
      setErrorMessage("wrong username or password")
      setTimeout(() => {
        setErrorMessage('')

      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setCorrectMessage("Log out successfully!")
    setTimeout(() => {
      setCorrectMessage('')
    }, 5000)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = { title: title, author: author, url: url }
    try {
      await blogService.create(newBlog)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
      setAuthor('')
      setTitle('')
      setUrl('')
      setCorrectMessage(`a new blog ${title} by ${author} added`)
      setCreateVisible(false)
      setTimeout(() => {
        setCorrectMessage('')
      }, 5000)
    } catch (exception) {
      setErrorMessage("invalid add, please check required input field!")
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <CorrectNotification message={correctMessage} />
        <ErrorNotification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>username
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>password
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  return (
    <div>
      <h2>blogs</h2>
      <CorrectNotification message={correctMessage} />
      <ErrorNotification message={errorMessage} />
      <p>{user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateVisible(true)}>create new blog</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>

      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form onSubmit={handleCreate}>
          <div>title:
            <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
          </div>
          <div>author:
            <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
          </div>
          <div>url:
            <input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
          </div>
          <button type="submit">create</button>
        </form>
        <button onClick={() => setCreateVisible(false)}>cancel</button>
      </div>


    </div>
  )
}

const CorrectNotification = (props) => {
  const messageStyle = {
    color: 'green',
    fontSize: 25,
    backgroundColor: '#CFCECE',
    margin: '10px 2px 30px 2px',
    border: 'solid green 3px',
    padding: '10px 10px 10px 10px',
    borderRadius: 8
  }

  if (props.message === '') {
    return null
  } else {
    return (
      <div style={messageStyle}>
        {props.message}
      </div>
    )
  }
}

const ErrorNotification = (props) => {
  const messageStyle = {
    color: 'red',
    fontSize: 25,
    backgroundColor: '#CFCECE',
    margin: '10px 2px 30px 2px',
    border: 'solid red 3px',
    padding: '10px 10px 10px 10px',
    borderRadius: 8
  }

  if (props.message === '') {
    return null
  } else {
    return (
      <div style={messageStyle}>
        {props.message}
      </div>
    )
  }
}

export default App
