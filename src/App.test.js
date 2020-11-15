import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

beforeEach(() => {
  render(<App />)
})

test('renders species list correctly', async () => {
  expect(screen.getByText('Loading...')).toBeInTheDocument()
  expect(await screen.findByText('Human')).toBeInTheDocument()
  expect(screen.getByText('Droid')).toBeInTheDocument()
})

test('opens species detail correctly', async () => {
  expect(await screen.findByText('Human')).toBeInTheDocument()
  fireEvent.click(screen.getByText('Human'))
  expect(screen.getByText('Classification')).toBeInTheDocument()
  fireEvent.click(screen.getByText('Classification'))
  expect(screen.queryByText('Classification')).not.toBeInTheDocument()
})

test('can search species correctly', async () => {
  expect(await screen.findByText('Human')).toBeInTheDocument()
  userEvent.type(screen.getByPlaceholderText('Search species...'), 'dug')
  fireEvent.keyDown(screen.getByPlaceholderText('Search species...'), {
    key: 'Enter',
    code: 'Enter',
  })
  expect(screen.getByText('Loading...')).toBeInTheDocument()
  expect(await screen.findByText('Dug')).toBeInTheDocument()
})

test('can handle search not found', async () => {
  expect(await screen.findByText('Human')).toBeInTheDocument()
  userEvent.type(screen.getByPlaceholderText('Search species...'), 'asdf')
  fireEvent.keyDown(screen.getByPlaceholderText('Search species...'), {
    key: 'Enter',
    code: 'Enter',
  })
  expect(screen.getByText('Loading...')).toBeInTheDocument()
  expect(await screen.findByText('Not Found')).toBeInTheDocument()
})
