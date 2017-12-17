import { authHeader, url } from '../_helpers';

export const recordService = {
    getByUserId,
    update,
};

function update(record) {
  const requestOptions = {
      method: 'PUT',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
  };

    return fetch(url() + '/records/' + record._id, requestOptions).then(response =>
      response.json().then(json => ({
        ok: response.ok,
        json
      })
    ))
    .then(handleResponse);
}

function getByUserId(user) {
  const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

    return fetch(url() + '/records/' + user._id, requestOptions).then(response =>
      response.json().then(json => ({
        ok: response.ok,
        json
      })
    ))
    .then(handleResponse);
}

function handleResponse({ok, error = "", json}) {
    if (!ok) {
        return Promise.reject(error !== "" ? error : json.error);
    }

    return json;
}
