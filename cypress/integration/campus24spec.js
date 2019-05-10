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

    it('it is not possible to create new user with same username', function () {
      cy.contains('Create new user')
        .click()
      cy.get('#newUsername')
        .type('olgaviho')
      cy.get('#newName')
        .type('pipapo')
      cy.get('#newPassword')
        .type('pipapo')
      cy.contains('Add')
        .click()
      cy.contains('Username must be unique')
    })

    it('user can login and logout with correct credentials', function () {
      cy.contains('Login')
        .click()
      cy.get('#Username')
        .type('olgaviho')
      cy.get('#Password')
        .type('salainen')
      cy.contains('login')
        .click()
      cy.contains('Welcome')

      cy.contains('Logout')
        .click()
      cy.contains('logout')
        .click()
      cy.contains('See you soon')
    })

    it('user can not login if username is wrong', function () {
      cy.contains('Login')
        .click()
      cy.get('#Username')
        .type('olga')
      cy.get('#Password')
        .type('salainen')
      cy.contains('login')
        .click()
      cy.contains('Wrong username or password')
    })

    it('user can not login if password is wrong', function () {
      cy.contains('Login')
        .click()
      cy.get('#Username')
        .type('olgaviho')
      cy.get('#Password')
        .type('sala')
      cy.contains('login')
        .click()
      cy.contains('Wrong username or password')
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
          cy.wait(3000)
          cy.contains('add')
            .click()
          cy.contains('New comment added')
          cy.contains('uusi kommentti')
        })

        it('user can edit and delete thread ', function () {
          cy.contains('Threads')
            .click()
          cy.contains('uusi threadi')
            .click()
          cy.get('#editMessage')
            .type('threadin teksti muuttuu')
          cy.contains('edit')
            .click()
          cy.contains('threadin teksti muuttuu')

          cy.contains('Threads')
            .click()
          cy.contains('uusi threadi')
            .click()
          cy.contains('delete')
            .click()
          cy.contains('Thread deleted')
        })

        describe('When there is a thread and comment in database', function () {
          beforeEach(function () {
            cy.contains('Threads')
              .click()
            cy.contains('uusi threadi')
              .click()
            cy.contains('Add new comment')
            cy.get('#newComment')
              .type('uusi kommentti')
            cy.wait(3000)
            cy.contains('add')
              .click()
            cy.contains('New comment added')
            cy.contains('uusi kommentti')
          })

          it('user can edit and delete comment', function () {
            cy.contains('Threads')
              .click()
            cy.contains('uusi threadi')
              .click()
            cy.get('#editComment')
              .type('kommentin teksti muuttuu')
            cy.contains('edit comment')
              .click()
            cy.contains('kommentin teksti muuttuu')

            cy.contains('Threads')
              .click()
            cy.contains('uusi threadi')
              .click()
            cy.contains('delete comment')
              .click()
            cy.contains('Comment deleted')
          })

          it('it is not possible edit or delete comments of the other users', function () {
            cy.contains('Logout')
              .click()
            cy.contains('logout')
              .click()

            cy.contains('Create new user')
              .click()
            cy.get('#newUsername')
              .type('leijona')
            cy.get('#newName')
              .type('leijona')
            cy.get('#newPassword')
              .type('pipapo')
            cy.contains('Add')
              .click()

            cy.contains('Login')
              .click()
            cy.get('#Username')
              .type('leijona')
            cy.get('#Password')
              .type('pipapo')
            cy.contains('login')
              .click()

            cy.contains('Threads')
              .click()
            cy.contains('uusi threadi')
              .click()
            cy.get('#editComment')
              .should('not.exist')
            cy.get('#deleteComment')
              .should('not.exist')
            cy.get('#editMessage')
              .should('not.exist')
            cy.get('#deleteThread')
              .should('not.exist')
          })

          it('it is possible to delete account', function () {
            cy.contains('Delete account')
              .click()
            cy.contains('Confirm')
              .click()

            cy.contains('Login')
              .click()
            cy.get('#Username')
              .type('olgaviho')
            cy.get('#Password')
              .type('salainen')
            cy.contains('login')
              .click()
            cy.contains('Wrong username or password')
            cy.contains('Threads')
              .click()
            cy.contains('uusi threadi')
            cy.contains('unknown user')
          })
        })
      })
    })
  })
})

