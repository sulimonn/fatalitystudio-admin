import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['blog'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://79.174.82.88:8000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
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
      query: (article) => ({
        url: `/blog/${article.id}`,
        method: 'PUT',
        body: article
      }),
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
