/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'superuser',
      username: 'root',
      password: 'secret'
    }
    const user2 = {
      name: 'others',
      username: 'others',
      password: 'others'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to the application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.contains('login').click()
      cy.contains('valid login! welcome!')
      cy.contains('superuser logged in')
      cy.contains('logout').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('hahaha')
      cy.contains('login').click()
      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.contains('login').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Hello world')
      cy.get('#author').type('linux')
      cy.get('#url').type('www.helsinki.com')
      cy.get('#create').click()
      cy.contains('Hello world linux')
    })

    it('A blog can be liked', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Hello world')
      cy.get('#author').type('linux')
      cy.get('#url').type('www.helsinki.com')
      cy.get('#create').click()

      cy.get('#view').click()
      cy.get('#like').click()
      cy.contains('1')
    })

    it('A blog can be deleted by creators', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Hello world')
      cy.get('#author').type('linux')
      cy.get('#url').type('www.helsinki.com')
      cy.get('#create').click()

      cy.get('#view').click()
      cy.get('#remove').click()

      // the blog context is included in the notification, although it has been removed from both frontend and database
      cy.get('.correct').should('contain', 'a new blog Hello world by linux added')
      cy.get('.correct').should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('A blog can not be deleted by others', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('Hello world')
      cy.get('#author').type('linux')
      cy.get('#url').type('www.helsinki.com')
      cy.get('#create').click()

      cy.contains('logout').click()

      cy.get('#password').type('others')
      cy.get('#username').type('others')

      cy.contains('login').click()
      cy.get('#view').click()
      // other user cannot view the remove button for deleting blogs
      // cy.get('#remove').click()
    })
  })
  describe('sort blogs', function () {
    beforeEach(function() {
      // log in user here
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.contains('login').click()
    })
    it('blogs are ordered', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('blog1')
      cy.get('#author').type('linux')
      cy.get('#url').type('www.helsinki.com')
      cy.get('#create').click()

      cy.contains('create new blog').click()
      cy.get('#title').type('blog2')
      cy.get('#author').type('linux')
      cy.get('#url').type('www.helsinki.com')
      cy.get('#create').click()

      cy.get('.general').eq(0).contains('blog1')
      cy.get('.general').eq(1).contains('blog2')

      cy.get('.general').eq(0).contains('view').click()
      cy.get('.general').eq(1).contains('view').click()

      cy.get('.detailed').eq(1).contains('like').click()

      cy.get('.general').eq(0).contains('blog2')
      cy.get('.general').eq(1).contains('blog1')
    })
  })
})