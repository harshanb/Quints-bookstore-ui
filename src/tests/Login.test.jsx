import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from '../pages/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../store/slices/userSlice';

// Mocking hooks in vite
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  Link: vi.fn(),
  useNavigate: vi.fn(),
}));

vi.mock('axios');

describe('Login Page Tests', () => {
  let mockDispatch;
  let mockNavigate;

  beforeEach(() => {
    mockDispatch = vi.fn();
    mockNavigate = vi.fn();

    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
    useSelector.mockReturnValue({ isLoggedIn: false });
  });

  // Login form rendering correctly
  it('renders the login form', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  //Redirects to /books on successful login
  it('redirects to /books on successful login', async () => {
    axios.post.mockResolvedValueOnce({ status: 200, data: { user: { email: 'test@test.com' }, token: 'fakeToken' } });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(login({ user: { email: 'test@test.com' }, token: 'fakeToken' }));
      expect(mockNavigate).toHaveBeenCalledWith('/books');
    });
  });
});
