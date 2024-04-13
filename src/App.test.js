import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Home component by default', () => {
  render(<App />);
  const homeElement = screen.getByTestId('home-container'); // Assuming the Home component has a data-testid attribute
  expect(homeElement).toBeInTheDocument();
});
