import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    delProduct:(state, action) =>{
      state.quantity -= 1;
      state.products.splice(action.payload,1);
      state.total -= action.payload.totalDel;
    }
  },
});

export const { addProduct, delProduct } = cartSlice.actions;
export default cartSlice.reducer;