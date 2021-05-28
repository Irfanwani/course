// actions
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_REJECTED = 'LOGIN_REJECTED'

// action creators
export const updateUser = update => ({
    type: UPDATE_USER,
    payload: update
})

export const addContact = newContact => ({
    type: UPDATE_CONTACT,
    payload: newContact
})

export const login = (username, password) => async dispatch => {
    try {
        let token = await "logIn(username, password)" // LogIn() here is undefined as it is going to be a backend function to handle authentication which returns token on success and an error message on failure
        dispatch({type: LOGIN_SUCCESS, payload: token})
    }
    catch(err) {
        dispatch({type: LOGIN_REJECTED, payload: err.message})
    }
}