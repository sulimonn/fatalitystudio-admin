import React, { useEffect } from 'react';
import { setTitle } from 'utils/titleHelper';

const Feedback = () => {
  useEffect(() => {
    setTitle('Отзывы');
  }, []);
  return <div></div>;
};

export default Feedback;
