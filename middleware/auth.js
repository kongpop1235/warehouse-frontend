export default function ({ store, redirect }) {
    store.dispatch('auth/loadToken');// Load token from cookies storage
    if (!store.getters['auth/isAuthenticated']) {
        return redirect('/auth');
    }
}
