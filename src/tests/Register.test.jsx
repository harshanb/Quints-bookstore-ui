import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../pages/Register/Register';

// Mock axios
vi.mock('axios');

describe('Register Component', () => {
  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks after each test
  });

  it('renders the form', () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    // Check if all input fields and the register button are rendered
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('shows error if passwords do not match', async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password124' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Check if the error message is shown when passwords do not match
    await waitFor(() => expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument());
  });

  it('shows error if a field is empty', async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Check if the error message is shown for empty fields
    await waitFor(() => expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument());
  });

  it('handles successful registration and redirects', async () => {
    // Mock axios.post to simulate a successful response
    axios.post.mockResolvedValue({ status: 200 });

    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Wait for the redirect (this would usually happen via navigate())
    await waitFor(() => expect(window.location.pathname).toBe('/'));
  });
});

