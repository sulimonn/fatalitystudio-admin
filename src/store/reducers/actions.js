// action - account reducer
export const LOGIN = '@auth/LOGIN';
export const LOGOUT = '@auth/LOGOUT';
export const REGISTER = '@auth/REGISTER';

export const login = (userData) => {
  return async (dispatch) => {
    // Perform any necessary API calls to authenticate the user
    // For example, make a POST request to your backend server
    // Upon successful authentication, dispatch the LOGIN action
    dispatch({
      type: LOGIN,
      payload: userData // You may want to adjust the payload as per your application's needs
    });
  };
};

export const logout = () => ({
  type: LOGOUT
});

export const register = (userData) => ({
  type: REGISTER,
  payload: userData
});

const initialState = {
  isLoggedIn: false,
  user: {
    name: 'sulaiman',
    email: 'info@codedthemes.com',
    password: '123456'
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    case REGISTER:
      return state;
    default:
      return state;
  }
};

export default authReducer;
