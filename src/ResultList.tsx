import React, {FC} from "react";
import {useSearchQuery} from "./service/songApi";
import {Alert, List, Spin} from "antd";

const {Item} = List;

type ResultListProps = { search: string };
export const ResultList: FC<ResultListProps> = ({search}) => {
    const {data, error, isFetching} = useSearchQuery(search);
    return <Spin spinning={isFetching}>
        {error
            ? <Alert message='Fehler beim Abruf vom Server' description={JSON.stringify(error)} type="error"/>
            : <List>{
                data?.records.length
                    ? data?.records.map((i) => <Item>:{i.title} ({i.composer})</Item>)
                    : null
            }</List>
        }
    </Spin>;
};
