import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {components} from "./OpenAPI.schema";

export type Song = components['schemas']['read-song'];
export type Person = components['schemas']['read-person'];
export type SearchResult = Pick<Song, 'id' | 'copyright_year' | 'origin'> & {
    title?: Song['name'],
    composer?: Person['name'],
    writer?: Person['name'],
}
export const songApi = createApi({
    reducerPath: 'songApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (builder) => ({
        search: builder.query<SearchResult, string>({query: (expr) => `search?q=${expr}`}),
        getSongById: builder.query<Song, number>({query: (id) => `records/song/${id}`}),
    })
});

export const {useSearchQuery, useGetSongByIdQuery} = songApi;
