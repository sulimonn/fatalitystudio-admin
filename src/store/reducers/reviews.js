import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken, setToken } from 'hooks/use-auth';

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://79.174.82.88/api',
    prepareHeaders: (headers) => {
      const token = getToken();
      setToken(token);
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Reviews'],
  endpoints: (build) => ({
    getReviews: build.query({
      query: () => ({
        url: '/review',
        method: 'GET'
      }),
      providesTags: ['Reviews']
    }),
    addReview: build.mutation({
      query: (data) => ({
        url: '/review',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Reviews']
    }),
    deleteReview: build.mutation({
      query: (id) => ({
        url: `/review/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Reviews']
    })
  })
});

export const { useGetReviewsQuery, useAddReviewMutation, useDeleteReviewMutation } = reviewsApi;

export default reviewsApi;
