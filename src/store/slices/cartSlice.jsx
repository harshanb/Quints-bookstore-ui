import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addItem(state, action) {
            const item = action.payload;
            item.quantity = 1;
            state.items.push(item);
        },
        removeItem(state, action) {
            console.log("removeItem",action.payload);
            state.items = state.items.filter(
                (item) => item?.id !== action.payload.id
            );
        },
        addQuantity(state, action) {
            console.log("action.payload",action.payload);
            const index = state.items.findIndex(
                (item) => item?.id === action.payload.id
            );
            if (index !== -1) {
                state.items[index].quantity += 1;
            }
        },
        reduceQuantity(state, action) {
            const index = state.items.findIndex(
                (item) => item?.id === action.payload.id
            );
            if(state.items[index].quantity === 1) {
                state.items = state.items.filter(
                    (item) => item?.id !== action.payload.id
                )
            } else {
                if(index !== -1){ 
                    state.items[index].quantity -= 1;
                }
            }
        },
        resetCart(state) {
            state.items = [];
        }
    },
});

export const { addItem, removeItem, addQuantity, reduceQuantity, resetCart } = cartSlice.actions;
export default cartSlice.reducer;