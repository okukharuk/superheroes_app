import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { ISuperhero } from "../models/ISuperhero";


export const superheroAPI = createApi({
    reducerPath: 'superheroAPI',
    baseQuery: fetchBaseQuery({baseUrl: '/api'}),
    tagTypes: ['Superhero'],
    endpoints: (build) => ({
        getSuperheroes: build.query<ISuperhero[], string>({
            query: () => ({
                url: `/superheroes`,
            }),
            providesTags: result => ['Superhero']
        }),
        getSuperhero: build.query<ISuperhero, string>({
            query: (_id) => ({
                url: `/superheroes/${_id}`,
            }),
            providesTags: result => ['Superhero']
        }),
        createSuperhero: build.mutation<ISuperhero, ISuperhero>({
            query: (superhero) => ({
                url: `/superheroes`,
                method: 'POST',
                body: superhero
            }),
            invalidatesTags: ['Superhero']
        }),
        updateSuperhero: build.mutation<ISuperhero, ISuperhero>({
            query: (superhero) => ({
                url: `/superheroes/${superhero._id}`,
                method: 'PUT',
                body: superhero
            }),
            invalidatesTags: ['Superhero']
        }),
        deleteSuperhero: build.mutation<ISuperhero, ISuperhero>({
            query: (superhero) => ({
                url: `/superheroes/${superhero._id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Superhero']
        }),
    })
})