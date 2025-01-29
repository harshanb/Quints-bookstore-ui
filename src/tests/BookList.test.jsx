import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';  
import BookList from '../pages/BookList/BookList';
import store from '../store';
import { Provider } from 'react-redux';

// Mocking fetch
// eslint-disable-next-line no-undef
global.fetch = vi.fn();

describe('BookList', () => {

  it('should render books correctly after fetching', async () => {
    const mockBooks = [
      { id: 1, title: 'The Monk', author: 'Robin' },
      { id: 2, title: 'Outliers', author: 'Malcolm Gladwel' },
    ];

    // Mock the fetch API with a valid response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockBooks,
    });

    render(
      <Provider store={store}>
        <BookList />
      </Provider>
    );
    await waitFor(() => screen.findByText(/The Monk/i));
    // Check if the books are displayed
    expect(screen.getByText('The Monk')).toBeInTheDocument();
    expect(screen.getByText('Outliers')).toBeInTheDocument();
  });

  it('should render "No books available" if no books are fetched', async () => {
    // Mock the fetch API with an empty array
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<BookList />);
    await waitFor(() => screen.getByText('No books available.'));
    expect(screen.getByText('No books available.')).toBeInTheDocument();
  });
});

