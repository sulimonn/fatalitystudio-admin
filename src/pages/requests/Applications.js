import React from 'react';
import Request from './Request';
import { useServiceId } from 'utils/useServiceId';

const Applications = () => {
  const id = useServiceId('app');
  console.log(id);
  return <Request title={'Разработка приложений'} id={id} />;
};

export default Applications;
