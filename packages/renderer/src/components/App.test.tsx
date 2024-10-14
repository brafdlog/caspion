import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('renders discord link', () => {
  render(<App />);
  const linkElement = screen.getByText(/ערוץ הדיסקורד שלנו/i);
  expect(linkElement).to.exist;
});
