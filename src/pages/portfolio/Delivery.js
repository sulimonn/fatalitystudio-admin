import React from 'react';
import PortfolioBase from './PortfolioBase';

const Delivery = () => {
  return <PortfolioBase serviceId={useServiceId('delivery')} title="Разработка агрегаторов доставки" />;
};

export default Delivery;
