import { render, screen } from '@testing-library/react';
import { describe, it, expect} from 'vitest';
import '@testing-library/jest-dom/vitest'
import Register from '../pages/Register/Register'; 

describe('Register Text to be rendered', () => {
    it('renders Register heading', () => {
        render(<Register />);
        const bookListText = screen.getByText(/Register/i);
        expect(bookListText).toBeInTheDocument();
    })
});