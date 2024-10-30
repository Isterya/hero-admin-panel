import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
   tagTypes: ['Heroes'],
   endpoints: (builder) => ({
      getHeroes: builder.query({
         query: () => '/heroes',
         providesTags: ['Heroes'],
      }),
      createHero: builder.mutation({
         query: (hero) => ({
            url: '/heroes',
            method: 'POST',
            body: hero,
         }),
         invalidatesTags: ['Heroes'],
      }),
      deleteHero: builder.mutation({
         query: (id) => ({
            url: `/heroes/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Heroes'],
      }),
      updateHero: builder.mutation({
         query: ({ id, ...updatedHeroData }) => ({
            url: `/heroes/${id}`,
            method: 'PUT',
            body: updatedHeroData,
         }),
         invalidatesTags: ['Heroes'],
      }),
   }),
});

export const { useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation, useUpdateHeroMutation } = apiSlice;
