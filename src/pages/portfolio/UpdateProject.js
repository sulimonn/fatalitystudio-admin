import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPortfolioQuery } from 'store/reducers/portfolio';
import ProjectForm from './ProjectForm';

const UpdateProject = () => {
  const { id } = useParams();
  const response = useGetPortfolioQuery(id);

  useEffect(() => {
    const fetchData = async () => {
      if (response.isError && id) await response.refetch();
    };
    fetchData();
    return () => {};
  }, [response, id]);
  return <ProjectForm id={id} response={response} />;
};

export default UpdateProject;
