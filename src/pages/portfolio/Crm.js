import React from 'react';
import PortfolioBase from './PortfolioBase';
import { useServiceId } from 'utils/useServiceId';

const Crm = () => {
  return <PortfolioBase serviceId={useServiceId('crm')} title="CRM системы" />;
};

export default Crm;
