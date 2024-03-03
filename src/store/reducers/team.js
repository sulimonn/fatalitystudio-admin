import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from 'hooks/use-auth';

export const teamApi = createApi({
  reducerPath: 'teamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://79.174.82.88/api/user',
    prepareHeaders: (headers) => {
      return headers.set('Authorization', `Token ${getToken()}`);
    }
  }),
  tagTypes: ['Team'],
  endpoints: (build) => ({
    getTeam: build.query({
      query: () => ({
        url: '/all',
        method: 'GET'
      }),
      providesTags: ['Team']
    }),
    getMember: build.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET'
      }),
      providesTags: ['Team']
    }),
    addMember: build.mutation({
      query: (data) => ({
        url: '/add',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Team']
    }),
    deleteMember: build.mutation({
      query: (id) => ({
        url: `/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Team']
    }),
    updateMember: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}/update`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Team']
    })
  })
});

export const { useGetTeamQuery, useGetMemberQuery, useAddMemberMutation, useDeleteMemberMutation, useUpdateMemberMutation } = teamApi;

export default teamApi;
