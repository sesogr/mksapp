import React, {FC, useState} from 'react';
import './App.css';
import {Card, Input, Layout, PageHeader} from "antd";
import {ResultList} from "./ResultList";
import {UsageNotes} from "./UsageNotes";
import {SearchMatch} from "./service/songApi";
import {DetailView} from "./DetailView";

const {Search} = Input;

const App: FC = () => {
    const [fieldValue, setFieldValue] = useState('');
    const [searchExpression, setSearchExpression] = useState('');
    const [selectedMatch, setSelectedMatch] = useState<SearchMatch | undefined>();
    return <Layout>
        <Layout.Content>
            <PageHeader
                title='Schlagerdatenbank'
                subTitle={selectedMatch ? `ID ${selectedMatch.id}` : 'durchsuchen nach'}
                backIcon={selectedMatch ? undefined : false}
                onBack={() => setSelectedMatch(undefined)}
                extra={selectedMatch
                    ? undefined
                    : <Search
                        allowClear
                        enterButton
                        onSearch={setSearchExpression}
                        onChange={(event) => setFieldValue(event.target.value)}
                        value={fieldValue}
                    />
                }
            >{searchExpression ? undefined : <UsageNotes/>}</PageHeader>
            <Card>
                {selectedMatch && <DetailView searchMatch={selectedMatch}/>}
                <ResultList
                    onSelect={setSelectedMatch}
                    search={searchExpression}
                    style={{display: !searchExpression || selectedMatch ? 'none' : ''}}
                />
            </Card>
        </Layout.Content>
    </Layout>;
};

export default App;
