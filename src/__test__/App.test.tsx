import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../App';
import { store } from '../store';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  test('renders cookbook app title', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/cookbook/i)).toBeInTheDocument();
  });
});
