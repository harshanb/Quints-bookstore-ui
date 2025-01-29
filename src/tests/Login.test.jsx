import { render, screen } from '@testing-library/react';
import { describe, it, expect} from 'vitest';
import '@testing-library/jest-dom/vitest'
import Login from '../pages/Login/Login'; 

describe('Login Text to be rendered', () => {
    it('renders login heading', () => {
        render(<Login />);
        const bookListText = screen.getByText(/login/i);
        expect(bookListText).toBeInTheDocument();
    })
});