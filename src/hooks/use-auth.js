import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInfo } from 'store/reducers/actions';

export function useAuth() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem('userToken') || null;
  const [isAuth, setIsAuth] = useState('loading');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(fetchUserInfo(token));
      console.log(response);
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
