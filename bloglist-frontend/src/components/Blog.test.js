/* eslint-disable linebreak-style */
/* eslint-disable quotes */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from "./Blog"
import BlogForm from "./BlogForm"

describe("exercise5.13-5.16", () => {
  test('renders content', () => {

    const user = {
      username: "root"
    }

    const blog = {
      title: "happy new year",
      author: "linux",
      url: "www.google.com",
      likes: 10,
      user: user
    }


    const { container } = render(<Blog blog={blog} user={user} />)


    const div1 = container.querySelector('.general')
    expect(div1).not.toHaveStyle('display: none')
    expect(div1).toHaveTextContent("happy new year")
    expect(div1).toHaveTextContent("linux")
    expect(div1).not.toHaveTextContent("www.google.com")
    expect(div1).not.toHaveTextContent(10)

    const div2 = container.querySelector('.detailed')
    expect(div2).toHaveStyle('display: none')
  })

  test('clicking the button', async () => {
    const userInput = {
      username: "root"
    }

    const blog = {
      title: "happy new year",
      author: "linux",
      url: "www.google.com",
      likes: 10,
      user: userInput
    }

    const { container } = render(<Blog blog={blog} user={userInput} />)

    const div1 = container.querySelector('.detailed')
    const div2 = container.querySelector('.general')

    expect(div1).toHaveStyle('display: none')
    expect(div2).not.toHaveStyle('display: none')

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(div1).toHaveTextContent("happy new year")
    expect(div1).toHaveTextContent("linux")
    expect(div1).toHaveTextContent("www.google.com")
    expect(div1).toHaveTextContent(10)

    expect(div1).not.toHaveStyle('display: none')
    expect(div2).toHaveStyle('display: none')

  })
  test('clicking like button twice', async () => {

    const userInput = {
      username: "root"
    }

    const blog = {
      title: "happy new year",
      author: "linux",
      url: "www.google.com",
      likes: 10,
      user: userInput
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} user={userInput} updateLikes={mockHandler} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText("like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
  test('BlogForm', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm handleCreate={createBlog} />)

    const inputs = screen.getAllByRole('textbox')
    const createButton = screen.getByText('create')

    await user.type(inputs[0], 'create a title')
    await user.type(inputs[1], 'create a author')
    await user.type(inputs[2], 'create a url')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author.author).toBe('create a author')
    expect(createBlog.mock.calls[0][0].title.title).toBe('create a title')
    expect(createBlog.mock.calls[0][0].url.url).toBe('create a url')

  })
} )

