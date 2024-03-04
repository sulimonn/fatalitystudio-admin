import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setToken } from 'hooks/use-auth';

// Create an API using createApi
const portfolioApi = createApi({
  reducerPath: 'portfolioApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://79.174.82.88/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      setToken(token);
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }
      headers.set('Origin', 'http://fatalitystudio.ru');

      return headers;
    }
  }),
  tagTypes: ['portfolio'],
  endpoints: (builder) => ({
    fetchPortfolio: builder.query({
      query: (id) => 'project' + (id ? `?service_id=${id}` : ''),
      providesTags: ['portfolio']
    }),
    addPortfolio: builder.mutation({
      query: (portfolioData) => ({
        url: 'project',
        method: 'POST',
        body: portfolioData
      }),
      invalidatesTags: ['portfolio']
    }),
    addPortfolioBigPhotos: builder.mutation({
      query: (upload) => ({
        url: `project/big_photo`,
        method: 'POST',
        body: upload
      }),
      invalidatesTags: ['portfolio']
    }),
    addPortfolioSmallPhotos: builder.mutation({
      query: (upload) => ({
        url: `project/small_photo`,
        method: 'POST',
        body: upload
      }),
      invalidatesTags: ['portfolio']
    }),
    editPortfolio: builder.mutation({
      query: ({ id, project }) => ({
        url: `project/${id}`,
        method: 'PATCH',
        body: project
      }),

      invalidatesTags: ['portfolio']
    }),
    deletePortfolio: builder.mutation({
      query: (id) => ({
        url: `project/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['portfolio']
    }),

    getPortfolio: builder.query({
      query: (id) => `project/${id}`,
      providesTags: ['portfolio']
    })
  })
});

// Export hooks for usage in components
export const {
  useFetchPortfolioQuery,
  useAddPortfolioMutation,
  useEditPortfolioMutation,
  useDeletePortfolioMutation,
  useGetPortfolioQuery,
  useAddPortfolioBigPhotosMutation,
  useAddPortfolioSmallPhotosMutation
} = portfolioApi;

// Export the reducer, actions, and middleware for Redux store configuration
export default portfolioApi;
