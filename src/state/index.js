import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isCartOpen: false,
    cart: [],
    items: [],
    subtotal: 0,
    userInfo: {}
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
            state.subtotal = state.cart.reduce((total, item) => total + item.price * item.count, 0)
        },

        removeFromCart: (state, action) =>{
            state.cart = state.cart.filter((item) => item.id !== action.payload.id ) //** Return every item that DOESN'T MATCH the Id of the item passed in (action)
            state.subtotal = state.cart.reduce((total, item) => total + item.price * item.count, 0)
        },

        increaseCount: (state, action) =>{
            const item = state.cart.find(item => item.id === action.payload.id);
            if (item) {
                item.count++;
                state.subtotal = state.cart.reduce((total, item) => total + item.price * item.count, 0)
            }
        },
        
        decreaseCount: (state, action) =>{
            state.cart = state.cart.map((item) =>{
                if (item.id === action.payload.id && item.count > 1) item.count--
                return item
            })
            state.subtotal = state.cart.reduce((total, item) => total + item.price * item.count, 0)
        },

        setIsCartOpen : (state) => {
            state.isCartOpen = !state.isCartOpen 
        },
        setUserInfo : (state, action) =>{
            state.userInfo = action.payload
        },
        clearCart: (state) =>{
            state.cart = []
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
    setUserInfo,
    clearCart,
} = cartSlice.actions

export default cartSlice.reducer