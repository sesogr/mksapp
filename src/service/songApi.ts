import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export type SearchResult = {
    id: number,
    title?: string,
    composer?: string,
    writer?: string,
    copyright_year?: string,
    origin?: string,
}
export type Song = {
    id: number,
    name?: string,
    copyright_year?: string,
    copyright_remark?: string,
    created_on?: string,
    label?: string,
    publisher_series?: string,
    publisher_number?: string,
    record_number?: string,
    origin?: string,
    dedication?: string,
    review?: string,
    addition?: string,
    index_no?: string,
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
