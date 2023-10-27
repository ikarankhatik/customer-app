import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Customer {
  id: number;
  name: string;
  age: number;
  address: string;
  imagePath?:string;
}

const initialState: Customer[] = [];

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer | Customer[]>) => {
      const dataToAdd = Array.isArray(action.payload) ? action.payload : [action.payload];

      for (const customerToAdd of dataToAdd) {
        const existingCustomerIndex = state.findIndex(customer => customer.id === customerToAdd.id);

        if (existingCustomerIndex !== -1) {
          // If the customer exists, update it instead of adding a new one
          state[existingCustomerIndex] = customerToAdd;
        } else {
          // If it doesn't exist, add it to the state
          state.push(customerToAdd);
        }
      }
    },
    deleteCustomer: (state, action: PayloadAction<number>) => {
      return state.filter(customer => customer.id !== action.payload);
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.findIndex(customer => customer.id === action.payload.id);

      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
  },
});

export const { addCustomer, deleteCustomer, updateCustomer } = customerSlice.actions;
export default customerSlice.reducer;
