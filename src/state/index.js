import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isCartOpen: false,
    cart: [],
    items: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setItems: (state, action) =>{
            state.items = action.payload;
        },

        addToCart: (state, action) =>{
            const { item } = action.payload;
            const itemIndex = state.cart.findIndex((cartItem) => cartItem.id === item.id);
            if (itemIndex === -1) {
                state.cart.push(item);
            } else {
                state.cart[itemIndex].count += item.count;
            }
            
        },

        removeFromCart: (state, action) =>{
            state.cart = state.cart.filter((item) => item.id !== action.payload.id ) //** Return every item that DOESN'T MATCH the Id of the item we pass in (action)
        },

        increaseCount: (state, action) =>{
            const item = state.cart.find(item => item.id === action.payload.id);
            if (item) {
                item.count++;
            }
        },
        
        decreaseCount: (state, action) =>{
            state.cart = state.cart.map((item) =>{
                if (item.id === action.payload.id && item.count > 1) item.count--
                return item
            })
        },

        setIsCartOpen : (state) => {
            state.isCartOpen = !state.isCartOpen 
        }

    }
})


export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
} = cartSlice.actions

export default cartSlice.reducer