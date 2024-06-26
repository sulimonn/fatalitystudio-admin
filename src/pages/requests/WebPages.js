import React from 'react';
import Requests from './Request';
import { useServiceId } from 'utils/useServiceId';

const WebPages = () => {
  const id = useServiceId('webpage');
  return <Requests title="Разработка сайтов" id={id} />;
};

export default WebPages;
