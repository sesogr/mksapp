import React, {FC} from "react";
import {SearchMatch, useSearchQuery} from "./service/songApi";
import {Result, Table} from "antd";
import {SongDetail} from "./SongDetail";

type ResultListProps = { search: string };
export const ResultList: FC<ResultListProps> = ({search}) => {
    const {data, error, isFetching} = useSearchQuery(search);
    return error
        ? <Result status='error' title='Fehler beim Abruf vom Server' extra={<pre>{JSON.stringify(error)}</pre>}/>
        : <Table<SearchMatch>
            columns={[
                {title: 'Titel', dataIndex: 'title'},
                {
                    title: 'Komponist*innen',
                    dataIndex: 'composer',
                    render: (value, {id}) => <SongDetail songId={id} type='composer' fallback={value}/>
                },
                {
                    title: 'Texter*innen',
                    dataIndex: 'writer',
                    render: (value, {id}) => <SongDetail songId={id} type='writer' fallback={value}/>
                },
                {title: 'Copyright (Jahr)', dataIndex: 'copyright_year'},
                {title: 'Herkunft', dataIndex: 'origin'},
            ]}
            dataSource={data?.records}
            loading={isFetching}
        />
};
