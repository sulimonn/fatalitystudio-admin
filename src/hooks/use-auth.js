import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInfo } from 'store/reducers/actions';

export function useSetToken(value) {
  checkToken();
  var expirationTime = new Date().getTime() + 3600000;
  localStorage.setItem('userToken', JSON.stringify({ value: value, expiration: expirationTime }));
}

export function getToken() {
  return JSON.parse(localStorage.getItem('userToken'))?.value || null;
}
function checkToken() {
  var item = getToken();
  if (item && item?.expiration && new Date().getTime() > item?.expiration) {
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
