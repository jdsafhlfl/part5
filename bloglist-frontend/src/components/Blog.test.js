/* eslint-disable linebreak-style */
/* eslint-disable quotes */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from "./Blog"

describe("exercise5.13-5.14", () => {
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
    expect(div1).toHaveTextContent("happy new year")
    expect(div1).toHaveTextContent("linux")
    expect(div1).not.toHaveTextContent("www.google.com")
    expect(div1).not.toHaveTextContent(10)

    const div2 = container.querySelector('.detailed')
    expect(div2).toHaveStyle('display: none')
  })

  test('clicking the button calls event handler once', async () => {
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
} )

