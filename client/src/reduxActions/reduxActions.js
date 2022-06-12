export const setCategories= (value) => {
    return {
        type: 'SET_CATEGORIES',
        payload: value
    }
}

export const setCurrencies = (value) => {
    return {
        type: 'SET_CURRENCIES',
        payload: value
    }
}

export const setProducts = (value) => {
    return {
        type: 'SET_PRODUCTS',
        payload: value
    }
}

export const setCurrency = (value) => {
    return {
        type: 'SET_CURRENCY',
        payload: value
    }
}

export const setSelectedProduct = (value) => {
    return {
        type: 'SET_SELECTED_PRODUCT',
        payload: value
    }
}

export const addProductToCart = (value) => {
    return {
        type: 'ADD_PRODUCT_TO_CART',
        payload: value
    }
}

export const setSelectedAttributes = (value) => {
    return {
        type: 'SET_SELECTED_ATTRIBUTES',
        payload: value
    }
}

export const updateCart = (value) => {
    return {
        type: 'UPDATE_CART',
        payload: value
    }
}