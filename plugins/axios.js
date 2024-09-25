import Cookies from 'js-cookie';

export default function ({ $axios, store }) {
    $axios.onRequest((config) => {
        const token = store.getters['auth/getToken'] || Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.error("No token found, unable to set Authorization header.");
        }

        return config;
    });
}
