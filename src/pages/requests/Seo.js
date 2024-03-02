import React from 'react';
import Requests from './Request';
import { useServiceId } from 'utils/useServiceId';

const Seo = () => {
  const id = useServiceId('seo');
  return <Requests title="Реклама и SEO" id={id} />;
};

export default Seo;
