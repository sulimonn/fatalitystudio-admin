import React from 'react';
import Requests from './Request';
import { useServiceId } from 'utils/useServiceId';

const Delivery = () => {
  const id = useServiceId('delivery');
  return <Requests title="Разработка агрегаторов доставки" id={id} />;
};

export default Delivery;
