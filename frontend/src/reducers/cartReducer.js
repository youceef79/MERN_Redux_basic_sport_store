import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from './cartService'

const initialState = {
  cart_items: [],
  item: {},
  isLoading: false,
  delIsLoading: false,
  upIsLoading: false,
};

 export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async () => {
      return await cartService.getCartItems()
  }
)


 export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (id) => {
      return await cartService.removeItemFromCart(id)
  }
)

  export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
      return await cartService.addToCart(item)
  }
)

 export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async (payload) => {
      return await cartService.updateCart(payload)
  }
)


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: () => initialState,  
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.cart_items = action.payload
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = true
        state.error = true
        state.message = action.payload
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.delIsLoading = true
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.delIsLoading = false
        state.cart_items = state.cart_items.filter((c) => c._id !== action.payload.id)
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.delIsLoading = true
        state.error = true
        state.message = action.payload
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.cart_items = action.payload
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = true
        state.error = true
        state.message = action.payload
      })
      .addCase(updateCart.pending, (state) => {
        state.upIsLoading = true
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.upIsLoading = false
        let new_items = state.cart_items.map((it) => {
           
            if( it._id == action.payload.id )
            it.quantity = action.payload.quantity

            return it 
        })
         state.cart_items = new_items
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.upIsLoading = true
        state.error = true
        state.message = action.payload
      })
  }
})

export const { resetCart  } = cartSlice.actions
export default cartSlice.reducer