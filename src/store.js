import {configureStore} from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSliceStore";
import customerReducer from "./features/customers/customerSliceStore";

const store = configureStore({
   reducer: {
       account: accountReducer,
       customer: customerReducer
   }
});
export default store;


