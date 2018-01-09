import { GET_ALL, ADD_USER, DELETE_USER } from '../actions/types';

const initialState = [];

export default function app(users = initialState, action) {
  switch (action.type) {
    case GET_ALL:
      return action.data;
    case ADD_USER:
      return [...users, { id: 0, firstname: '', surname: '' }];
    case DELETE_USER:
      return users.filter(user => user.id !== action.id);
    default:
      return users;
  }
}
