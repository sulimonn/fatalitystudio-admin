// actions
export const openSnackbar = (message, severity) => {
  return {
    type: 'OPEN_SNACKBAR',
    payload: {
      message,
      severity
    }
  };
};

export const closeSnackbar = () => {
  return { type: 'CLOSE_SNACKBAR' };
};

const initialState = {
  open: false,
  message: '',
  severity: 'success'
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_SNACKBAR':
      return {
        ...state,
        open: true,
        message: action.payload.message,
        severity: action.payload.severity
      };
    case 'CLOSE_SNACKBAR':
      return { ...state, open: false };
    default:
      return state;
  }
};

export default snackbarReducer;
