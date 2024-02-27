import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInfo } from 'store/reducers/actions';

export function useAuth() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem('userToken') || null;
  const [isAuth, setIsAuth] = useState('loading');

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setIsAuth(false);
        return;
      }
      const response = await dispatch(fetchUserInfo(token));
      console.log(response);
      if (response.payload.id) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    };

    fetchData();
  }, [dispatch, token]);

  return {
    isAuth,
    user,
    token
  };
}
