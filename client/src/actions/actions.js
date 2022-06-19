import { request, gql } from 'graphql-request'

export const getCurrencies = async () => {

    return await request('http://localhost:4000/', gql`
        query {
            currencies {
                label
                symbol
            }
        }
    
    `);
}

export const getCategories = async () => {

    return await request('http://localhost:4000/', gql`
        query {
            categories {
                name
            }
        }
    `);
}

export const getProductsByCategories = async (type = 'all') => {

    return await request('http://localhost:4000/', gql`
        query {
            category (input: { title: "${type}" }) {
                name
                products {
                    name
                    id
                    brand
                    gallery
                    category
                    prices {
                        amount
                        currency {
                            label
                            symbol
                        }
                    }
                    inStock
                    description
                    attributes {
                        id
                        name
                        type
                        items {
                            id
                            value
                            displayValue
                        }
                    }
                }
            }
        }
    `);
}

export const getProductInfo = async (id) => {

    return await request('http://localhost:4000/', gql`
        query {
            product (id: "${id}") {
                name
                id
                brand
                prices {
                    amount
                    currency {
                        label
                        symbol
                    }
                }
                inStock
                gallery
                category
                attributes {
                    id
                    name
                    type
                    items {
                        id
                        value
                        displayValue
                    }
                }
                description
                
            }
        }

    `);
}