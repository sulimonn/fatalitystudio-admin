import React, { useEffect } from 'react';
import { setTitle } from 'utils/titleHelper';

const Team = () => {
  useEffect(() => {
    setTitle('Команда');
  }, []);
  return <div></div>;
};

export default Team;
