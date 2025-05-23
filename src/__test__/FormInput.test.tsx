import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import FormInput from '../components/FormInput';

describe('FormInput', () => {
  test('renders input and label correctly', () => {
    render(
      <FormInput
        type="text"
        name="title"
        value="Test Value"
        onChange={() => {}}
        label="Recipe Title"
      />
    );

    expect(screen.getByText(/recipe title/i)).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Test Value');
  });

  test('calls onChange when user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <FormInput
        onChange={handleChange}
        type="text"
        name="title"
        value=""
        label="Recipe Title"
      />
    );

    const input = screen.getByRole('textbox');

    await user.type(input, 'Cake');

    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  test('applies required attribute when required is true', () => {
    render(
      <FormInput
        onChange={() => {}}
        type="text"
        name="title"
        value=""
        label="Recipe Title"
        required={true}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });
});
