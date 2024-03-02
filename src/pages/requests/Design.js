import React from 'react';
import Requests from './Request';
import { useServiceId } from 'utils/useServiceId';

const Design = () => {
  const id = useServiceId('design');
  return <Requests title="Дизайн" id={id} />;
};

export default Design;
