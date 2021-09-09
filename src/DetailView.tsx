import React, {FC} from "react";
import {SearchMatch, useGetFullSongByIdQuery} from "./service/songApi";
import {Descriptions, Result, Spin} from "antd";
import {ReferenceLines} from "./ReferenceLines";

const {Item} = Descriptions;

export const DetailView: FC<{ searchMatch: SearchMatch }> = ({searchMatch}) => {
    const {data, error, isFetching} = useGetFullSongByIdQuery(searchMatch.id);
    return error
        ? <Result status='error' title='Fehler beim Abruf vom Server' extra={<pre>{JSON.stringify(error)}</pre>}/>
        : <Spin spinning={isFetching}>
            <Descriptions bordered column={1} labelStyle={{width: 0, whiteSpace: 'nowrap'}} size='small'>
                <Item label='Titel'>{data?.name || searchMatch.title}</Item>
                <Item label='Komponist*innen'>
                    <ReferenceLines
                        collection={data?.mks_x_composer_song}
                        fallback={searchMatch?.composer}
                        parentPropertyName='composer_id'
                    />
                </Item>
                <Item label='Texter*innen'>
                    <ReferenceLines
                        collection={data?.mks_x_writer_song}
                        fallback={searchMatch?.writer}
                        parentPropertyName='writer_id'
                    />
                </Item>
                <Item label='Copyright (Jahr)'>{data?.copyright_year || searchMatch.copyright_year}</Item>
                <Item label='Entstehung'>{data?.created_on}</Item>
                <Item label='Graphiker*innen'>
                    <ReferenceLines collection={data?.mks_x_cover_artist_song} parentPropertyName='cover_artist_id'/>
                </Item>
                <Item label='Interpret*innen'>
                    <ReferenceLines collection={data?.mks_x_performer_song} parentPropertyName='performer_id'/>
                </Item>
                <Item label='Label'>{data?.label}</Item>
                <Item label='Verlag'>
                    <ReferenceLines collection={data?.mks_x_publisher_song} parentPropertyName='publisher_id'/>
                </Item>
                <Item label='Verlagsort'>
                    <ReferenceLines
                        collection={data?.mks_x_publication_place_song}
                        parentPropertyName='publication_place_id'
                    />
                </Item>
                <Item label='Verlagsreihe'>{data?.publisher_series}</Item>
                <Item label='Verlagsnummer'>{data?.publisher_number}</Item>
                <Item label='Plattennr.'>{data?.record_number}</Item>
                <Item label='Herkunft'>{data?.origin}</Item>
                <Item label='Gattung'>
                    <ReferenceLines collection={data?.mks_x_genre_song} parentPropertyName='genre_id'/>
                </Item>
                <Item label='Widmung'>{data?.dedication}</Item>
                <Item label='Sammlung'>
                    <ReferenceLines collection={data?.mks_x_collection_song} parentPropertyName='collection_id'/>
                </Item>
                <Item label='Kritik'>{data?.review}</Item>
                <Item label='Ergänzung'>{data?.addition}</Item>
                <Item label='Quelle'>
                    <ReferenceLines collection={data?.mks_x_source_song} parentPropertyName='source_id'/>
                </Item>
            </Descriptions>
        </Spin>;
};
