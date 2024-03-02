import React from 'react';
import PortfolioBase from './PortfolioBase';
import { useServiceId } from 'utils/useServiceId';

const Application = () => {
  return <PortfolioBase serviceId={useServiceId('app')} title="Разработка приложений" />;
};

export default Application;
