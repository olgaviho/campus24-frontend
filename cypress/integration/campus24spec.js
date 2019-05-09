describe('Campus24 ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Campus24')
  })

  it('front page contains navigation menu', function () {
    cy.contains('Threads')
    cy.contains('Login')
    cy.contains('Create new user')
  })

  it('user can create a new user', function () {
    cy.contains('Create new user')
      .click()
    cy.get('#newUsername')
      .type('olgaviho')
    cy.get('#newName')
      .type('olga')
    cy.get('#newPassword')
      .type('salainen')
    cy.contains('Add')
      .click()
    cy.contains('New user added')
  })

  describe('When there is a user in the database', function () {
    beforeEach(function () {
      cy.contains('Create new user')
        .click()
      cy.get('#newUsername')
        .type('olgaviho')
      cy.get('#newName')
        .type('olga')
      cy.get('#newPassword')
        .type('salainen')
      cy.contains('Add')
        .click()
      cy.contains('New user added')
    })

    it('user can login', function () {
      cy.contains('Login')
        .click()
      cy.get('#Username')
        .type('olgaviho')
      cy.get('#Password')
        .type('salainen')
      cy.contains('login')
        .click()
      cy.contains('Welcome')
    })

    describe('When logged in ', function () {
      beforeEach(function () {
        cy.contains('Login')
          .click()
        cy.get('#Username')
          .type('olgaviho')
        cy.get('#Password')
          .type('salainen')
        cy.contains('login')
          .click()
      })


      it('user can add a new thread ', function () {
        cy.contains('Add a new thread')
          .click()
        cy.get('#NewTitle')
          .type('uusi threadi')
        cy.get('#NewMessage')
          .type('on kivaa luoda uusi threadi')
        cy.contains('add')
          .click()
        cy.contains('New thread added')
      })

      describe('When there is a thread in database', function () {
        beforeEach(function () {
          cy.contains('Add a new thread')
            .click()
          cy.get('#NewTitle')
            .type('uusi threadi')
          cy.get('#NewMessage')
            .type('on kivaa luoda uusi threadi')
          cy.contains('add')
            .click()
        })

        it('user can add a new comment ', function () {
          cy.contains('Threads')
            .click()
          cy.contains('uusi threadi')
            .click()
          cy.contains('Add new comment')  
          cy.get('#newComment')
            .type('uusi kommentti')
          cy.wait(5000)
          cy.contains('add')
            .click() 
          cy.contains('New comment added')
          cy.contains('uusi kommentti')
        })
      })
    })
  })
})
