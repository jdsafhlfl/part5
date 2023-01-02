import { useState } from "react"


import blogService from "../services/blogs"

const BlogForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')


    const handleCreate = async (event) => {
        event.preventDefault()
        const newBlog = { title: title, author: author, url: url }
        try {
            await blogService.create(newBlog)
            blogService.getAll().then(blogs =>
                props.setBlogs(blogs)
            )
            props.blogFormRef.current.toggleVisibility()
            setAuthor('')
            setTitle('')
            setUrl('')
            props.setCorrectMessage(`a new blog ${title} by ${author} added`)
            setTimeout(() => {
                props.setCorrectMessage('')
            }, 5000)
        } catch (exception) {
            props.setErrorMessage("invalid add, please check required input field!")
            setTimeout(() => {
                props.setErrorMessage('')
            }, 5000)
        }
    }


    return (
        <div>
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
        </div>
    )
}

export default BlogForm