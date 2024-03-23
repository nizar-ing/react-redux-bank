import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false
};

const accountSlice = createSlice({
    name: 'account',
    initialState: INITIAL_STATE,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {amount, purpose}
                }
            },
            reducer(state, action) {
                if (state.loan > 0) return;
                state.balance += action.payload.amount;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
            }
        },
        payLoan(state) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },
        convertingCurrency(state){
            state.isLoading = true;
        }
    }
});

//console.log(accountSlice);

export const {withdraw, requestLoan,
              payLoan, convertingCurrency} = accountSlice.actions;
export function deposit(amount, currency){
    if(currency === 'USD') return {type: 'account/deposit', payload: amount};
    return async function (dispatch, getState) {
        dispatch({type: 'account/convertingCurrency'});
        const result = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await result.json();
        const {USD: converted} = data.rates;
        dispatch({type: 'account/deposit', payload: converted});
    }
}
export default accountSlice.reducer

/* ---------------------------------------------------- Old way of using Redux -----------------------------------------------------------*/

// export default function accountReducer(state = ACCOUNT_INITIAL_STATE, action){
//     switch(action.type){
//         case 'account/deposit': return { ...state, balance: state.balance + action.payload, isLoading: false};
//         case 'account/withdraw': return { ...state, balance: state.balance - action.payload};
//         case 'account/requestLoan': if(state.loan > 0) return state;
//             return { ...state, balance: state.balance + action.payload.amount, loan: action.payload.amount, loanPurpose: action.payload.purpose};
//         case 'account/payLoan': return { ...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan};
//         case 'account/convertingCurrency': return { ...state, isLoading: true};
//         default: return state; // It's a common feature in Redux
//     }
// }
//
// export function deposit(amount, currency){
//     if(currency === 'USD') return {type: 'account/deposit', payload: amount};
//     return async function (dispatch, getState) {
//         dispatch({type: 'account/convertingCurrency'});
//         const result = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
//         const data = await result.json();
//         const {USD: converted} = data.rates;
//         dispatch({type: 'account/deposit', payload: converted});
//     }
// }
//
// export function withdraw(amount){
//     return {type: 'account/withdraw', payload: amount};
// }
//
// export function requestLoan(amount, purpose){
//     return {
//         type: 'account/requestLoan',
//         payload: {amount, purpose}
//     };
// }
//
// export function payLoan(){
//     return {type: 'account/payLoan'};
// }