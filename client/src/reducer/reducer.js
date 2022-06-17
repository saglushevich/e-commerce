const initialState = {
    currencies: [],
    categories: [],
    products: {},
    currency: "$",
    cart: JSON.parse(sessionStorage.getItem('cart')) || [],
}

const reducer = (state = initialState, action) => { 
    switch(action.type) {
        case 'SET_CURRENCIES':
            return {...state, currencies: action.payload}
        case "SET_CATEGORIES":
            return {...state, categories: action.payload}
        case "SET_PRODUCTS":
            return {...state, products: action.payload}
        case "SET_CURRENCY":
            return {...state, currency: action.payload}
        case "ADD_PRODUCT_TO_CART":
            return {...state, cart: [...state.cart, action.payload]}
        case "UPDATE_CART":
            return {...state, cart: action.payload}
        default: 
            return state
    }
}

export default reducer;