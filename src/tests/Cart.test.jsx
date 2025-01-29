import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect} from 'vitest';  
import store from '../store';
import Cart from '../pages/Cart/Cart';
import { addItem, addQuantity } from '../store/slices/cartSlice';

const renderCart = () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    </Provider>
  );
};

describe('Cart Component', () => {
  it('displays empty cart message when no items are in the cart', () => {
    renderCart();

    // Cart should be empty
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Items/i })).toBeInTheDocument();
  });

  it('displays items in the cart when there are items', async () => {
    // Dispatch an action to add a book to the cart
    store.dispatch(addItem({
      id: 1,
      title: 'The Monk',
      author: 'Robin',
      price: 10,
      quantity: 1
    }));

    renderCart();

    // Check if the item properties are visible
    await waitFor(() => {
      expect(screen.getByText('The Monk')).toBeInTheDocument()
      expect(screen.getByText('Robin')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });
  });

  it('updates total correctly when adding/removing items', async () => {
    store.dispatch(addQuantity({
      id: 1,
      title: 'Book 1',
      author: 'Author 1',
      price: 10,
      quantity: 1
    }));
    store.dispatch(addQuantity({
      id: 2,
      title: 'Book 2',
      author: 'Author 2',
      price: 20,
      quantity: 1
    }));

    renderCart();

    // Check if the amount is correct
    expect(screen.getByText('20.00')).toBeInTheDocument(); 

    // Click on the "+" button to increase quantity
    fireEvent.click(screen.getAllByRole('button', { name: '+' })[0]);

    // Wait for the UI update
    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument(); 
    });
  });
});
