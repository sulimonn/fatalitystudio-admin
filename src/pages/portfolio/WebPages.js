import React from 'react';
import PortfolioBase from './PortfolioBase';
import { useServiceId } from 'utils/useServiceId';

const WebPages = () => {
  return <PortfolioBase serviceId={useServiceId('web')} title="Разработка сайтов" />;
};

export default WebPages;
