import { loadState } from './';

export function authHeader() {
    // return authorization header with jwt token
    let user = loadState();

    return user && user.token ? { 'Authorization': 'Bearer ' + user.token } : {};
}
