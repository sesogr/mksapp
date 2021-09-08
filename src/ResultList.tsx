import React, {FC} from "react";
import {SearchMatch, useSearchQuery} from "./service/songApi";
import {Result, Table, TableProps} from "antd";
import {SongDetail} from "./SongDetail";

type ResultListProps = TableProps<SearchMatch> & {
    search: string,
    onSelect?: (result: SearchMatch) => void,
};
export const ResultList: FC<ResultListProps> = ({search, onSelect, ...props}) => {
    const {data, error, isFetching} = useSearchQuery(search);
    return error
        ? <Result status='error' title='Fehler beim Abruf vom Server' extra={<pre>{JSON.stringify(error)}</pre>}/>
        : <Table<SearchMatch>
            {...props}
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
            onRow={(match: SearchMatch) => ({onClick: () => onSelect?.(match)})}
            size='small'
        />
};
