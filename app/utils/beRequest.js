import 'whatwg-fetch';

/**
 * BE API - strapi on https://hidden-falls-59190.herokuapp.com/admin
 * user: dev pass: qq112233 || Demo on https://gouidev.herokuapp.com
 */
const apiEndpoint = 'https://hidden-falls-59190.herokuapp.com';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  // return response.json();
  return response.json().catch(() => {});
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
 // response.status >= 200 && response.status < 300 || && response.status === 201
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function loginApi(url, options) {
  const requestOptions = Object.assign({
  }, options);

  const requestUrl = `${apiEndpoint}${url}`;

  return fetch(requestUrl, requestOptions)
    .then(checkStatus)
    .then(parseJSON);
}
