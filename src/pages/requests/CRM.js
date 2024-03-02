import React from 'react';
import Requests from './Request';
import { useServiceId } from 'utils/useServiceId';

const CRM = () => {
  const id = useServiceId('crm');
  return <Requests title="CRM системы" id={id} />;
};

export default CRM;
