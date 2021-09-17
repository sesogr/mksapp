import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {components} from "./OpenAPI.schema";

export type Song = components['schemas']['read-song'];
export type AnyReferenceParent = {
    collection_id?: NonNullable<components['schemas']['read-collection']>,
    composer_id?: NonNullable<components['schemas']['read-person']>,
    cover_artist_id?: NonNullable<components['schemas']['read-person']>,
    genre_id?: NonNullable<components['schemas']['read-genre']>,
    performer_id?: NonNullable<components['schemas']['read-person']>,
    publication_place_id?: NonNullable<components['schemas']['read-city']>,
    publisher_id?: NonNullable<components['schemas']['read-publisher']>,
    source_id?: NonNullable<components['schemas']['read-source']>,
    writer_id?: NonNullable<components['schemas']['read-person']>
};
type CollectionListSchemaName = 'list-x_collection_song' | 'list-x_composer_song' | 'list-x_cover_artist_song'
    | 'list-x_genre_song' | 'list-x_performer_song' | 'list-x_publication_place_song'
    | 'list-x_publisher_song' | 'list-x_source_song' | 'list-x_writer_song';
export type AnyReference =
    Omit<NonNullable<components['schemas'][CollectionListSchemaName]['records']>[number], 'collection_id'>
    & AnyReferenceParent;
export type CollectionReference =
    Omit<NonNullable<components['schemas']['list-x_collection_song']['records']>[number], 'collection_id'>
    & { collection_id: NonNullable<components['schemas']['read-collection']> };
export type ComposerReference =
    Omit<NonNullable<components['schemas']['list-x_composer_song']['records']>[number], 'composer_id'>
    & { composer_id: NonNullable<components['schemas']['read-person']> };
export type CoverArtistReference =
    Omit<NonNullable<components['schemas']['list-x_cover_artist_song']['records']>[number], 'cover_artist_id'>
    & { cover_artist_id: NonNullable<components['schemas']['read-person']> };
export type GenreReference =
    Omit<NonNullable<components['schemas']['list-x_genre_song']['records']>[number], 'genre_id'>
    & { genre_id: NonNullable<components['schemas']['read-genre']> };
export type PerformerReference =
    Omit<NonNullable<components['schemas']['list-x_performer_song']['records']>[number], 'performer_id'>
    & { performer_id: NonNullable<components['schemas']['read-person']> };
export type PublicationPlaceReference =
    Omit<NonNullable<components['schemas']['list-x_publication_place_song']['records']>[number], 'publication_place_id'>
    & { publication_place_id: NonNullable<components['schemas']['read-city']> };
export type PublisherReference =
    Omit<NonNullable<components['schemas']['list-x_publisher_song']['records']>[number], 'publisher_id'>
    & { publisher_id: NonNullable<components['schemas']['read-publisher']> };
export type SourceReference =
    Omit<NonNullable<components['schemas']['list-x_source_song']['records']>[number], 'source_id'>
    & { source_id: NonNullable<components['schemas']['read-source']> };
export type WriterReference =
    Omit<NonNullable<components['schemas']['list-x_writer_song']['records']>[number], 'writer_id'>
    & { writer_id: NonNullable<components['schemas']['read-person']> };
export type FullSong = Song & {
    mks_x_collection_song?: CollectionReference[],
    mks_x_composer_song?: ComposerReference[],
    mks_x_cover_artist_song?: CoverArtistReference[],
    mks_x_genre_song?: GenreReference[],
    mks_x_performer_song?: PerformerReference[],
    mks_x_publication_place_song?: PublicationPlaceReference[],
    mks_x_publisher_song?: PublisherReference[],
    mks_x_source_song?: SourceReference[],
    mks_x_writer_song?: WriterReference[],
};
export type Person = components['schemas']['read-person'];
export type SearchMatch = Pick<Song, 'copyright_year' | 'origin'> & {
    id: NonNullable<Song['id']>,
    title?: Song['name'],
    composer?: Person['name'],
    writer?: Person['name'],
};
const joins = 'join=x_collection_song,collection&join=x_composer_song,person&join=x_cover_artist_song,person&' +
    'join=x_genre_song,genre&join=x_performer_song,person&join=x_publication_place_song,city&' +
    'join=x_publisher_song,publisher&join=x_source_song,source&join=x_writer_song,person';
export const songApi = createApi({
    reducerPath: 'songApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8081/'}),
    endpoints: (builder) => ({
        getCollectionBySongId: builder.query<{ records: CollectionReference[] }, number>({query: (id) => `records/x_collection_song/?filter=song_id,eq,${id}&join=collection`}),
        getComposerBySongId: builder.query<{ records: ComposerReference[] }, number>({query: (id) => `records/x_composer_song/?filter=song_id,eq,${id}&join=person`}),
        getCoverArtistBySongId: builder.query<{ records: CoverArtistReference[] }, number>({query: (id) => `records/x_cover_artist_song/?filter=song_id,eq,${id}&join=person`}),
        getGenreBySongId: builder.query<{ records: GenreReference[] }, number>({query: (id) => `records/x_genre_song/?filter=song_id,eq,${id}&join=genre`}),
        getPerformerBySongId: builder.query<{ records: PerformerReference[] }, number>({query: (id) => `records/x_performer_song/?filter=song_id,eq,${id}&join=person`}),
        getPublicationPlaceBySongId: builder.query<{ records: PublicationPlaceReference[] }, number>({query: (id) => `records/x_publication_place_song/?filter=song_id,eq,${id}&join=city`}),
        getPublisherBySongId: builder.query<{ records: PublisherReference[] }, number>({query: (id) => `records/x_publisher_song/?filter=song_id,eq,${id}&join=publisher`}),
        getSourceBySongId: builder.query<{ records: SourceReference[] }, number>({query: (id) => `records/x_source_song/?filter=song_id,eq,${id}&join=source`}),
        getWriterBySongId: builder.query<{ records: WriterReference[] }, number>({query: (id) => `records/x_writer_song/?filter=song_id,eq,${id}&join=person`}),
        getFullSongById: builder.query<FullSong, number>({query: (id) => `records/song/${id}?${joins}`}),
        getSongById: builder.query<Song, number>({query: (id) => `records/song/${id}`}),
        search: builder.query<{ records: SearchMatch[] }, Record<string, string>>({query: (expr) => `search?${new URLSearchParams(expr)}`}),
    })
});

export const {
    useGetCollectionBySongIdQuery,
    useGetComposerBySongIdQuery,
    useGetCoverArtistBySongIdQuery,
    useGetGenreBySongIdQuery,
    useGetPerformerBySongIdQuery,
    useGetPublicationPlaceBySongIdQuery,
    useGetPublisherBySongIdQuery,
    useGetSourceBySongIdQuery,
    useGetWriterBySongIdQuery,
    useGetFullSongByIdQuery,
    useGetSongByIdQuery,
    useSearchQuery
} = songApi;
