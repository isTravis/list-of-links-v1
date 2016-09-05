export const LOGIN_DATA_LOAD = 'LOGIN_DATA_LOAD';
export const LOGIN_DATA_SUCCESS = 'LOGIN_DATA_SUCCESS';
export const LOGIN_DATA_FAIL = 'LOGIN_DATA_FAIL';

export function getLoginData() {
  return (dispatch) => {
    dispatch({ type: LOGIN_DATA_LOAD });

    return fetch('http://jsonplaceholder.typicode.com/users')
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        dispatch({ type: LOGIN_DATA_SUCCESS, result });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_DATA_FAIL, error });
      });
  }
}