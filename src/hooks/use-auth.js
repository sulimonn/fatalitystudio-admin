import { useSelector } from 'react-redux';

export function useAuth() {
  const { token, user } = useSelector((state) => state.auth);

  return {
    isAuth: !!token,
    user,
    token
  };
}
