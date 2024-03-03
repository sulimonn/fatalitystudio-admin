import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetArticleQuery } from 'store/reducers/blogApi';
import ArticleForm from './ArticleForm';

const UpdateArticle = () => {
  const { id } = useParams();
  const { data } = useGetArticleQuery(id);

  return <ArticleForm id={id} data={data} />;
};

export default UpdateArticle;
