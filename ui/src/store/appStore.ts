import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import customerReducer from './customerSlice';

const appStore = configureStore({
    reducer: {
      user:userReducer,
      customer:customerReducer,
    },
  });
  
  export default appStore;