import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const servicesApi = createApi({
  reducerPath: 'services',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://79.174.82.88/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }
      headers.set('Origin', 'http://fatalitystudio.ru');

      return headers;
    }
  }),
  tagTypes: ['services'],
  endpoints: (builder) => ({
    fetchServices: builder.query({
      query: () => 'service',
      providesTags: ['services']
    }),
    addService: builder.mutation({
      query: (service) => ({
        url: 'service/add',
        method: 'POST',
        body: service
      }),
      invalidatesTags: ['services']
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `service/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['services']
    }),
    fetchTasks: builder.query({
      query: (id) => 'task' + (id ? `?service_id=${id}` : ''),
      providesTags: ['services']
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: 'task/add',
        method: 'POST',
        body: task
      }),
      invalidatesTags: ['services']
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `task/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: ['services']
    }),
    reviewTask: builder.mutation({
      query: (id) => ({
        url: `task/${id}/review`,
        method: 'POST'
      }),
      invalidatesTags: ['services']
    })
  })
});

export const {
  useFetchServicesQuery,
  useAddServiceMutation,
  useDeleteServiceMutation,
  useFetchTasksQuery,
  useAddTaskMutation,
  useReviewTaskMutation,
  useDeleteTaskMutation
} = servicesApi;

export default servicesApi;
