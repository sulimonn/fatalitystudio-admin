import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchServicesQuery } from 'store/reducers/services';
import AddService from './AddService';

const UpdateService = () => {
  const { id } = useParams();
  const response = useFetchServicesQuery();
  const [service, setService] = useState(null);

  useEffect(() => {
    if (response.data) {
      const foundService = response.data.find((service) => service.id.toString() === id);
      if (foundService) setService({ ...foundService, processes: foundService.processes.map((process) => JSON.parse(process)) });
    }
  }, [response.data, id]);

  return <AddService response={service} id={id} />;
};

export default UpdateService;
