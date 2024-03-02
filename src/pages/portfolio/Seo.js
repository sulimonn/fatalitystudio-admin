import React from 'react';
import PortfolioBase from './PortfolioBase';
import { useServiceId } from 'utils/useServiceId';

const Seo = () => {
  return <PortfolioBase serviceId={useServiceId('seo')} title="Реклама и SEO" />;
};

export default Seo;
