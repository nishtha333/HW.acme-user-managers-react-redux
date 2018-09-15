import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import axios from 'axios'

const initialState = {
    users: []
}

// Action Types
const FETCH_USERS = 'FETCH_USERS'
const USERS_FETCHED = 'USERS_FETCHED'
const DELETE_USER = 'DELETE_USER'
const USER_DELETED = 'USER_DELETED'
const CREATE_USER = 'CREATE_USER'
const USER_CREATED = 'USER_CREATED'
const UPDATE_USER = 'UPDATE_USER'
const USER_UPDATED = 'USER_UPDATED'
const ERROR_RECEIVED = 'ERROR_RECEIVED'

// Action Creators
export const fetchUsers = () => ({ type: FETCH_USERS })
export const usersFetched = (users) => ({ type: USERS_FETCHED, users })
export const deleteUser = (id) => ({ type: DELETE_USER, id })
export const userDeleted = (id) => ({ type: USER_DELETED, id })
export const createUser = (user) => ({ type: CREATE_USER, user})
export const userCreated = (user) => ({ type: USER_CREATED, user })
export const updateUser = (user) => ({ type: UPDATE_USER, user })
export const userUpdated = (user) => ({ type: USER_UPDATED, user })
export const errorReceived = (error) => ({ type: ERROR_RECEIVED, error })

// Middleware 
const customMiddleWare = store => next => action => {

    if(action.type === FETCH_USERS) {
        axios.get('/api/users')
            .then(response => response.data)
            .then(users => store.dispatch(usersFetched(users)))
    }
    else if(action.type === DELETE_USER) {
        axios.delete(`/api/users/${action.id}`)
            .then(() => store.dispatch(userDeleted(action.id)))
    }
    else if(action.type === CREATE_USER) {
        axios.post('/api/users', action.user)
            .then(response => response.data)
            .then(user => store.dispatch(userCreated(user)))
            .catch(error => store.dispatch(errorReceived(error)))
    }
    else if(action.type === UPDATE_USER) {
        axios.put(`/api/users/${action.user.id}`, action.user)
            .then(response => response.data)
            .then(user => store.dispatch(userUpdated(user)))
            .catch(error => store.dispatch(errorReceived(error)))
    }
    next(action);
}

// Reducer
function reducer (state = initialState, action) {
    let users

    switch (action.type) {
      case FETCH_USERS:
        return state
      case USERS_FETCHED:
        return {...state, users: action.users}
      case DELETE_USER:
        return state
      case USER_DELETED:
        users = state.users.filter(user => user.id !== action.id)
                                    .map(user => user.managerId !== action.id ? user : { id: user.id, name: user.name, managerId: null})
                
        return {...state, users}
      case CREATE_USER:
        return state
      case USER_CREATED:
        users = [...state.users, action.user]
        return {...state, users}
      case UPDATE_USER:
        return state
      case USER_UPDATED:
        users = state.users.map(user => user.id === action.user.id ? action.user : user)
        return {...state, users}
      default:
        return state
    }
  }

const store = createStore(
    reducer,
    applyMiddleware(customMiddleWare, loggerMiddleware)
  )
  
  export default store