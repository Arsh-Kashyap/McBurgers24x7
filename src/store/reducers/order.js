import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
const initialState = {
    orders: [],
    loading: false,
    purchased: false
};
const purchaseInit = (state, action) => {
    return updateObject(state, { purchase: false });
}
const PurchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
}
const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {
        id: action.orderId
    });
    return updateObject(state, {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    });
}
const PurchaseBurgerFail=(state,action)=>{
    return updateObject(state, { loading: false });
}
const FetchOrdersStart=(state,action)=>{
    return updateObject(state, { loading: true });
}
const FetchOrdersSuccess=(state,action)=>{
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
}
const FetchOrdersFail=(state,action)=>{
    return updateObject(state, { loading: false });
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);

        case actionTypes.PURCHASE_BURGER_START: return PurchaseBurgerStart(state, action);

        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action);

        case actionTypes.PURCHASE_BURGER_FAIL:return PurchaseBurgerFail(state,action);
            
        case actionTypes.FETCH_ORDERS_START: return FetchOrdersStart(state,action);
            
        case actionTypes.FETCH_ORDERS_SUCCESS:return FetchOrdersSuccess(state,action);
            
        case actionTypes.FETCH_ORDERS_FAIL:return FetchOrdersFail(state,action);
            
        default: return state;
    }
}
export default reducer;