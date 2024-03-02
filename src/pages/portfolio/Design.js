import React from 'react';
import PortfolioBase from './PortfolioBase';
import { useServiceId } from 'utils/useServiceId';

const Design = () => {
  return <PortfolioBase serviceId={useServiceId('design')} title="Дизайн" />;
};

export default Design;
