import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
    fullName: '',
    customerID: '',
    createdAt: ''
};

const customerSlice = createSlice({
    name: 'customer',
    initialState: INITIAL_STATE,
    reducers: {
        createCustomer: {
            prepare(fullName, customerID) {
                return {
                    payload: {fullName, customerID, createdAt: new Date().toString()}
                }
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.customerID = action.payload.customerID;
                state.createdAt = action.payload.createdAt;
            }
        },
        updateCustomerName(state, action){
            state.fullName = action.payload;
        }
    }
});

export const {createCustomer,
              updateCustomerName} = customerSlice.actions;
export default customerSlice.reducer;

/* ----------------------------------------------The old way of using redux ------------------------------------------*/

// export default function customerReducer(state = CUSTOMER_INITIAL_STATE, action){
//     switch(action.type){
//         case 'customer/createCustomer': return { ...state, fullName: action.payload.fullName, customerID: action.payload.customerID, createdAt: action.payload.createdAt};
//         case 'customer/updateCustomerName': return { ...state, fullName: action.payload};
//         default: return state; // It's a common feature in Redux
//     }
// }
//
// export function createCustomer(fullName, nationalID){
//     return {
//         type: 'customer/createCustomer',
//         payload: {fullName, nationalID, createdAt: new Date().toString()}
//     }
// }
// export function updateCustomerName(fullName){
//     return {
//         type: 'customer/updateCustomerName',
//         payload: fullName
//     }
// }