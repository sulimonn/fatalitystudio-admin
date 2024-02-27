import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const servicesApi = createApi({
  reducerPath: 'services',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://79.174.82.88/api/' }),
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
        body: service,
        headers: {
          Origin: 'http://fatalitystudio.ru',
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('userToken')}`
        }
      }),
      invalidatesTags: ['services']
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `service/${id}`,
        method: 'DELETE',
        headers: {
          Origin: 'http://fatalitystudio.ru',
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('userToken')}`
        }
      }),
      invalidatesTags: ['services']
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: 'task/add',
        method: 'POST',
        body: task,
        headers: {
          Origin: 'http://fatalitystudio.ru',
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('userToken')}`
        }
      }),
      invalidatesTags: ['services']
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `task/${id}/delete`,
        method: 'DELETE',
        headers: {
          Origin: 'http://fatalitystudio.ru',
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('userToken')}`
        }
      }),
      invalidatesTags: ['services']
    }),
    reviewTask: builder.mutation({
      query: (id) => ({
        url: `task/${id}/review`,
        method: 'POST',
        headers: {
          Origin: 'http://fatalitystudio.ru',
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('userToken')}`
        }
      }),
      invalidatesTags: ['services']
    })
  })
});

export const {
  useFetchServicesQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useReviewTaskMutation,
  useAddServiceMutation,
  useDeleteServiceMutation
} = servicesApi;

export default servicesApi;
