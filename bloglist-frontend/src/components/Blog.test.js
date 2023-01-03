/* eslint-disable linebreak-style */
/* eslint-disable quotes */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from "./Blog"

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


  const div = container.querySelector('.general')
  expect(div).toHaveTextContent("happy new year")
  expect(div).toHaveTextContent("linux")
  expect(div).not.toHaveTextContent("www.google.com")
  expect(div).not.toHaveTextContent(10)
})