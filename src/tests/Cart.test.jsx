import { render, screen } from '@testing-library/react';
import { describe, it, expect} from 'vitest';
import '@testing-library/jest-dom/vitest'
import Cart from '../pages/Cart/Cart'; 

describe('Cart to be rendered', () => {
    it('renders Cart heading', () => {
        render(<Cart />);
        const bookListText = screen.getByText(/Cart/i);
        expect(bookListText).toBeInTheDocument();
    })
});