import cookieparser from 'cookieparser';

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        if (req && req.headers.cookie) {
            const parsedCookies = cookieparser.parse(req.headers.cookie || '');
            const token = parsedCookies.token;
            if (token) {
                commit('auth/setToken', token);
            }
        }
    },
};
