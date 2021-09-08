import {Tag} from "antd";
import React, {FC} from "react";
import {
    useGetCollectionBySongIdQuery,
    useGetComposerBySongIdQuery,
    useGetCoverArtistBySongIdQuery,
    useGetGenreBySongIdQuery,
    useGetPerformerBySongIdQuery,
    useGetPublicationPlaceBySongIdQuery,
    useGetPublisherBySongIdQuery,
    useGetSourceBySongIdQuery,
    useGetWriterBySongIdQuery
} from "./service/songApi";

type DetailType =
    'collection'
    | 'composer'
    | 'cover_artist'
    | 'genre'
    | 'performer'
    | 'publication_place'
    | 'publisher'
    | 'source'
    | 'writer';
type SongDetailProps = { type: DetailType, songId?: number, fallback?: string };
export const SongDetail: FC<SongDetailProps> = ({type, songId, fallback}) => {
    const data = {
        collection: useGetCollectionBySongIdQuery(songId || 0, {skip: type !== 'collection'}),
        composer: useGetComposerBySongIdQuery(songId || 0, {skip: type !== 'composer'}),
        cover_artist: useGetCoverArtistBySongIdQuery(songId || 0, {skip: type !== 'cover_artist'}),
        genre: useGetGenreBySongIdQuery(songId || 0, {skip: type !== 'genre'}),
        performer: useGetPerformerBySongIdQuery(songId || 0, {skip: type !== 'performer'}),
        publication_place: useGetPublicationPlaceBySongIdQuery(songId || 0, {skip: type !== 'publication_place'}),
        publisher: useGetPublisherBySongIdQuery(songId || 0, {skip: type !== 'publisher'}),
        source: useGetSourceBySongIdQuery(songId || 0, {skip: type !== 'source'}),
        writer: useGetWriterBySongIdQuery(songId || 0, {skip: type !== 'writer'})
    };
    return <>{
        (data[type].data?.records as Array<any> | undefined)
            ?.flatMap((r) => [
                r[`${type}_id`].name as string,
                r.annotation && <Tag>{r.annotation}</Tag>,
                <br/>
            ])
            .slice(0, -1)
        || fallback
        || ''
    }</>;
};
