import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {components} from "./OpenAPI.schema";

export type Song = components['schemas']['read-song'];
export type FullSong = Song & {
    mks_x_collection_song?: Omit<NonNullable<components['schemas']['list-x_collection_song']['records']>[number], 'collection_id'>[],
    mks_x_composer_song?: Omit<NonNullable<components['schemas']['list-x_composer_song']['records']>[number], 'composer_id'>[],
    mks_x_cover_artist_song?: Omit<NonNullable<components['schemas']['list-x_cover_artist_song']['records']>[number], 'cover_artist_id'>[],
    mks_x_genre_song?: Omit<NonNullable<components['schemas']['list-x_genre_song']['records']>[number], 'genre_id'>[],
    mks_x_performer_song?: Omit<NonNullable<components['schemas']['list-x_performer_song']['records']>[number], 'performer_id'>[],
    mks_x_publication_place_song?: Omit<NonNullable<components['schemas']['list-x_publication_place_song']['records']>[number], 'publication_place_id'>[],
    mks_x_publisher_song?: Omit<NonNullable<components['schemas']['list-x_publisher_song']['records']>[number], 'publisher_id'>[],
    mks_x_source_song?: Omit<NonNullable<components['schemas']['list-x_source_song']['records']>[number], 'source_id'>[],
    mks_x_writer_song?: Omit<NonNullable<components['schemas']['list-x_writer_song']['records']>[number], 'writer_id'>[],
};
export type Person = components['schemas']['read-person'];
export type SearchResult = Pick<Song, 'id' | 'copyright_year' | 'origin'> & {
    title?: Song['name'],
    composer?: Person['name'],
    writer?: Person['name'],
}
const joins = 'join=x_collection_song,collection&join=x_composer_song,person&join=x_cover_artist_song,person&' +
    'join=x_genre_song,genre&join=x_performer_song,person&join=x_publication_place_song,city&' +
    'join=x_publisher_song,publisher&join=x_source_song,source&join=x_writer_song,person';
export const songApi = createApi({
    reducerPath: 'songApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (builder) => ({
        getFullSongById: builder.query<Song, number>({query: (id) => `records/song/${id}?${joins}`}),
        getSongById: builder.query<Song, number>({query: (id) => `records/song/${id}`}),
        search: builder.query<SearchResult, string>({query: (expr) => `search?q=${expr}`}),
    })
});

export const {useGetFullSongByIdQuery, useGetSongByIdQuery, useSearchQuery} = songApi;
