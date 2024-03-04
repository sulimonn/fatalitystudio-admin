import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setToken } from 'hooks/use-auth';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['blog'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://79.174.82.88/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      setToken(token);
      headers.set('Origin', 'http://fatalitystudio.ru');
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }

      return headers;
    }
  }),

  endpoints: (build) => ({
    getBlog: build.query({
      query: () => '/blog',
      providesTags: ['blog']
    }),
    getArticle: build.query({
      query: (id) => `/blog/${id}`,
      providesTags: ['blog']
    }),
    addArticle: build.mutation({
      query: (article) => ({
        url: '/blog',
        method: 'POST',
        body: article
      }),
      invalidatesTags: ['blog']
    }),
    updateArticle: build.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/blog/${id}`,
          method: 'PATCH',
          body: formData
        };
      },
      invalidatesTags: ['blog']
    }),

    deleteArticle: build.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['blog']
    })
  })
});

export const { useGetBlogQuery, useAddArticleMutation, useDeleteArticleMutation, useGetArticleQuery, useUpdateArticleMutation } = blogApi;
