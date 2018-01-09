import axios from 'axios';

import { API_URL } from '../config/constants';
import { GET_ALL, ADD_USER, DELETE_USER, USER_ERROR } from './types';

function received(data) {
  return {
    type: GET_ALL,
    data,
  };
}

function userError(error) {
  return {
    type: USER_ERROR,
    error,
  };
}

function getAll() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${API_URL}/users`,
      });
      dispatch(received(data));
    } catch (error) {
      dispatch(userError(error));
    }
  };
}

function updateUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `${API_URL}/users`,
        data: user,
      });
      dispatch(received(data));
    } catch (error) {
      dispatch(userError(error));
    }
  };
}

function addUser() {
  return {
    type: ADD_USER,
  };
}

function deleted(id) {
  return {
    type: DELETE_USER,
    id,
  };
}

function deleteUser(id) {
  return async (dispatch) => {
    try {
      await axios({
        method: 'DELETE',
        url: `${API_URL}/users`,
        params: { id },
      });
      dispatch(deleted(id));
    } catch (error) {
      dispatch(userError(error));
    }
  };
}

export { getAll, updateUser, addUser, deleteUser };
