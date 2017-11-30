import { authHeader, url } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    return fetch(url() + '/auth/login', requestOptions)
        .then(response =>
          response.json().then(json => ({
            ok: response.ok,
            json
          })
        ))
        .then(({ ok, json }) => {

          if(!ok){
            return Promise.reject(json.error);
          }
          // login successful if there's a jwt token in the response
          if (json.user && json.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', JSON.stringify({user: json.user, token: json.token}));
          }

            return json.user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url() + '/users', requestOptions).then(response => response.json().then(json => ({
      ok: response.ok,
      json
    })
  )).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url() + '/users/' + id, requestOptions).then(response => response.json().then(json => ({
      ok: response.ok,
      json
    })
  )).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(url() + '/auth/register', requestOptions).then(response => response.json().then(json => ({
      ok: response.ok,
      json
    })
  )).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(url() + '/users/' + user.id, requestOptions).then(response => response.json().then(json => ({
      ok: response.ok,
      json
    })
  )).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(url() + '/users/' + id, requestOptions).then(response => response.json().then(json => ({
      ok: response.ok,
      json
    })
  )).then(handleResponse);
}

function handleResponse({ok, json}) {
    if (!ok) {
        return Promise.reject(json.error);
    }

    return json;
}
