import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setToken } from 'hooks/use-auth';

const servicesApi = createApi({
  reducerPath: 'services',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://79.174.82.88/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      setToken(token);
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }

      return headers;
    }
  }),
  tagTypes: ['services', 'processes', 'tasks'],
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
    editService: builder.mutation({
      query: ({ id, formData }) => ({
        url: `service/${id}/update`,
        method: 'PATCH',
        body: formData
      }),
      invalidatesTags: ['services']
    }),
    addProcess: builder.mutation({
      query: (process) => ({
        url: 'service/process',
        method: 'POST',
        body: process
      }),
      invalidatesTags: ['processes']
    }),
    editProcess: builder.mutation({
      query: ({ id, ...process }) => ({
        url: `service/process/${id}`,
        method: 'PATCH',
        body: process
      }),
      invalidatesTags: ['processes']
    }),
    fetchTasks: builder.query({
      query: (id) => 'task' + (id ? `?service_id=${id}` : ''),
      providesTags: ['tasks']
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: 'task/add',
        method: 'POST',
        body: task
      }),
      invalidatesTags: ['tasks']
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `task/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: ['tasks']
    }),
    reviewTask: builder.mutation({
      query: (id) => ({
        url: `task/${id}/review`,
        method: 'POST'
      }),
      invalidatesTags: ['tasks']
    }),
    addCommentToTask: builder.mutation({
      query: ({ id, ...comment }) => ({
        url: `task/${id}`,
        method: 'PATCH',
        body: comment
      }),
      invalidatesTags: ['tasks']
    })
  })
});

export const {
  useFetchServicesQuery,
  useAddServiceMutation,
  useDeleteServiceMutation,
  useEditServiceMutation,
  useAddProcessMutation,
  useEditProcessMutation,
  useFetchTasksQuery,
  useAddTaskMutation,
  useReviewTaskMutation,
  useDeleteTaskMutation,
  useAddCommentToTaskMutation
} = servicesApi;

export default servicesApi;
