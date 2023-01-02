import { useState, forwardRef, useImperativeHandle } from 'react'
import CorrectNotification from "./CorrectNotification"
import ErrorNotification from "./ErrorNotification"
import Blog from './Blog'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {    
        return {      
            toggleVisibility    
        }  
    })

    props.blogs.sort((a,b) => a.likes - b.likes)

    return (
        <div>
            <h2>blogs</h2>
            <CorrectNotification message={props.correctMessage} />
            <ErrorNotification message={props.errorMessage} />
            <p>{props.user.name} logged in
                <button onClick={props.handleLogout}>logout</button>
            </p>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
                <div>
                    {props.blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} user={props.user} setBlogs={props.setBlogs} />
                    )}
                </div>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

export default Togglable