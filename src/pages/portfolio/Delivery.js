import React from 'react';
import PortfolioBase from './PortfolioBase';
import { useServiceId } from 'utils/useServiceId';

const Delivery = () => {
  return <PortfolioBase serviceId={useServiceId('delivery')} title="Разработка агрегаторов доставки" />;
};

export default Delivery;
