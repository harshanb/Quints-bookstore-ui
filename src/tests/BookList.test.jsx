import { render, screen } from '@testing-library/react';
import { describe, it, expect} from 'vitest';
import '@testing-library/jest-dom/vitest'
import BookList from '../pages/BookList/BookList';

describe('BookList to be rendered', () => {
    it('renders BookList heading', () => {
        render(<BookList />);
        const bookListText = screen.getByText(/BookList/i);
        expect(bookListText).toBeInTheDocument();
    })
});