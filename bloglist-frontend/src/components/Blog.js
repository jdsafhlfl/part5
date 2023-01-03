/* eslint-disable linebreak-style */
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setBlogs }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateLikes = async () => {
    const newObject = {
      user: blog.user.id,
      blogId: blog.id,
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await blogService.update(newObject)
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    backgroundColor: 'blue'
  }

  const buttonVisible = { display: user.username === blog.user.username ? '' : 'none' }

  const deleteOneBlog = async () => {
    if(window.confirm('Remove blog '+blog.title+' by '+blog.author)){
      const blogId = blog.id
      await blogService.deleteBlog(blogId)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }

  return (

    <div style={blogStyle}>
      <div style={hideWhenVisible} className="general">
        {blog.title} {blog.author}
        <button id='view' onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="detailed" >
        <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button id='like' onClick={updateLikes}>like</button></p>
        <p>{blog.author}</p>
        <div style={buttonVisible}>
          <button style={buttonStyle} onClick={deleteOneBlog} >remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog