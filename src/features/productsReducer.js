import { createSlice } from '@reduxjs/toolkit';

const supermarketProducts = [
  {
    id: 1,
    name: 'Milk',
    description:
      'Dairy product available in various forms such as whole milk, skim milk, and lactose-free milk.',
    price: 2.99, // Example price in dollars
  },
  {
    id: 2,
    name: 'Bread',
    description:
      'Staple food item available in different varieties like white, whole wheat, and multigrain.',
    price: 1.99, // Example price in dollars
  },
  {
    id: 3,
    name: 'Eggs',
    description:
      'Versatile protein source that can be prepared in various ways, such as scrambled, boiled, or fried.',
    price: 3.49, // Example price in dollars
  },
  {
    id: 4,
    name: 'Bananas',
    description:
      'Popular fruit that is convenient, nutritious, and a good source of potassium.',
    price: 0.69, // Example price in dollars
  },
  {
    id: 5,
    name: 'Cereal',
    description:
      'Breakfast option available in a wide range of flavors and types, including whole grain, granola, and bran cereals.',
    price: 4.29, // Example price in dollars
  },
];
const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    loadProducts: (state) => {
      state = supermarketProducts;
      return state;
    },
    addProduct: (state, action) => {
      state.unshift(action.payload);
    },
    removeProduct: (state, action) => {
      state.splice(state.findIndex(action.payload.id), 1);
    },
  },
});
export default productsSlice.reducer;
export const productsAction = productsSlice.actions;
