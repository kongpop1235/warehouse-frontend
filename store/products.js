export const state = () => ({
    products: [],
});

export const mutations = {
    setProducts(state, products) {
        state.products = products;
    },
    addProduct(state, product) {
        console.log(product)
        state.products.push(product);
    },
    updateProduct(state, updatedProduct) {
        const index = state.products.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
            state.products.splice(index, 1, updatedProduct);
        }
    },
    deleteProduct(state, productId) {
        state.products = state.products.filter(product => product.id !== productId);
    },
};

export const actions = {
    fetchProducts({ commit }) {
        // ดึงข้อมูลสินค้า (เช่น จาก API)
        const products = [
            { id: 1, name: 'Product 1', price: 100, quantity: 10 },
            { id: 2, name: 'Product 2', price: 200, quantity: 20 },
        ];
        commit('setProducts', products);
    },
};
