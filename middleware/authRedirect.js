import Cookies from 'js-cookie';
import cookieparser from 'cookieparser';

export default function ({ store, redirect, route, req }) {
    let token;

    if (process.server && req) {
        const parsedCookies = cookieparser.parse(req.headers.cookie || '');
        token = parsedCookies.token;
    } else if (process.client) {
        token = Cookies.get('token');
    }

    if (token) {
        store.commit('auth/setToken', token);
    }

    const isAuthenticated = store.getters['auth/isAuthenticated'];

    if (isAuthenticated && ((route.path === '/' || route.name === null) || route.path === '/auth')) {
        return redirect('/dashboard');
    }

    if (!isAuthenticated && route.path !== '/auth') {
        return redirect('/auth');
    }
}