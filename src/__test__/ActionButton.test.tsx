/**
 * Unit tests for the reusable ActionButton component
 * These tests verify rendering, click behaviour, loading state, and content override via children
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActionButton from '../components/ActionButton';
import { describe, test, vi, expect } from 'vitest';

describe('Action Button', () => {
  // Test that the button renders correctly with the provided text
  test('renders the button with given text', () => {
    render(<ActionButton buttonText="Update Recipe" />);
    expect(screen.getByText(/Update Recipe/i)).toBeInTheDocument();
  });

  // Test that the loading state overrides the button text
  test('displays loading text when isLoading is true', () => {
    render(<ActionButton isLoading={true} />);
    expect(screen.getByText(/submitting.../i)).toBeInTheDocument();
  });

  // Test that the onClick handler is triggered when the button is clicked
  test('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <ActionButton type="button" onClick={handleClick}>
        Go Back to Home
      </ActionButton>
    );

    const btn = screen.getByRole('button', { name: 'Go Back to Home' });
    await user.click(btn);
    expect(handleClick).toBeCalled();
  });

  // Test that children passed to the button override the buttonText prop
  test('renders children if provided (overrides buttonText)', () => {
    render(<ActionButton type="button">Go Back to Home</ActionButton>);
    // Confirm custom child content appears
    expect(screen.getByText(/go back to home/i)).toBeInTheDocument();
    // Confirm default buttonText does not appear
    expect(screen.queryByText(/Update Recipe/i)).not.toBeInTheDocument();
  });
});
