import shop from '@/api/shop'
export default {
    namespaced: true,
    state: {
        products: []
    },
    getters: {
        availableProduct(state, getters) {
            return state.products
        }
    },
    actions: {
        fetchProduct({state, commit}) {
            shop.getProducts(products => {
                commit('setProduct', products)
            })
        }
    },
    mutations: {
        setProduct(state, products) {
            state.products = products
        }
    }
}