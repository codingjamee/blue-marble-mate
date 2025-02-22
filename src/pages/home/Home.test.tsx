import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

test('renders App component', () => {
  render(<Home />);
  const titleElement = screen.getByText(/BlueMarble Mate/i);
  expect(titleElement).toBeInTheDocument();
});
