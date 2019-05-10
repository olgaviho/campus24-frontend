import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import Thread from './Thread'

afterEach(cleanup)

test('renders content', () => {
  const thread = {
    title: 'Komponenttitestaus tapahtuu react-testing-library:llä',
    message: 'pipapo'
  }

  const component = render(
    <Thread thread={thread} />
  )

  expect(component.container).toHaveTextContent(
    'Komponenttitestaus tapahtuu react-testing-library:llä'
  )
})