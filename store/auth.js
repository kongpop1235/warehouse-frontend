import Cookies from 'js-cookie';

export const state = () => ({
    token: null,
});

export const mutations = {
    setToken(state, token) {
        state.token = token;
    },
};

export const actions = {
    // Load token from Cookies
    loadToken({ commit }) {
        const token = Cookies.get('token');
        if (token) {
            commit('setToken', token);
        }
    },

    // Store the token in cookies when logging in.
    login({ commit }, token) {
        commit('setToken', token);
        Cookies.set('token', token, { expires: 1 });
    },

    // Delete token from Cookies when logging out.
    logout({ commit }) {
        commit('setToken', null);
        Cookies.remove('token');
    },
};

export const getters = {
    isAuthenticated(state) {
        return !!state.token;
    },
    getToken(state) {
        return state.token;
    },
};
