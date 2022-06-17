import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Fetch from './Fetch';

const server = setupServer(
  rest.get('/greeting',(req, res, ctx) => {
    return res(ctx.json({greeting:'Hello there'}))
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('it loads and displays greeting', async () => {
  //arrange
  //act
  //assert

  render(<Fetch url="/greeting"/>);
  fireEvent.click(screen.getByText('Load Greeting'));
  
  await waitFor(() => screen.getByRole('heading'))
  expect(screen.getByRole('heading')).toHaveTextContent('Hello there');
  expect(screen.getByRole('button')).toBeDisabled();

})

test('test for error scenario', async () =>  {
  server.use(
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  )

    render(<Fetch url="/greeting"></Fetch>);

    fireEvent.click(screen.getByText('Load Greeting'));

    await waitFor(() => screen.getByRole('alert'));

    expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!');
    expect(screen.getByRole('button')).not.toBeDisabled();

} )







/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/


