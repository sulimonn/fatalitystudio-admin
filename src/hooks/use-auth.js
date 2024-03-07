import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInfo } from 'store/reducers/actions';

export function setToken(value) {
  checkToken();
  const keepSignIn = localStorage.getItem('keepSignIn') === 'true';
  var expirationTime = new Date().getTime() + (keepSignIn ? 1000 * 60 * 60 * 24 : 1000 * 60 * 60);
  localStorage.setItem('userToken', JSON.stringify({ value: value, expiration: expirationTime }));
}

export function getToken() {
  return JSON.parse(localStorage.getItem('userToken'))?.value || null;
}
function checkToken() {
  var item = JSON.parse(localStorage.getItem('userToken'));
  if (item && item?.expiration && new Date().getTime() > item?.expiration) {
    console.log('expired token');
    localStorage.removeItem('userToken');
  }
}

export function useAuth() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const token = getToken();
  const [isAuth, setIsAuth] = useState('loading');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      checkToken();
      if (!token) {
        setIsAuth(false);
        return;
      }
      const response = await dispatch(fetchUserInfo(token));
      if (response.payload.response?.status === 401) {
        localStorage.removeItem('userToken');
        setIsAuth(false);
        return;
      }
      if (response.error) {
        setErrorMessage(response.payload);
        setIsAuth('error');
        return;
      }

      if (response.payload.id) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    };

    fetchData();
  }, [dispatch, token]);

  return {
    errorMessage,
    isAuth,
    user,
    token
  };
}
