import React, {FC, useState} from 'react';
import {Input, Layout} from "antd";
import {ResultList} from "./ResultList";
import {UsageNotes} from "./UsageNotes";

const {Search} = Input;

const App: FC = () => {
    const [searchString, setSearchString] = useState('');
    const [selectedId, setSelectedId] = useState<number | undefined>();
    return <Layout>
        <Layout.Content>
            <Search allowClear onSearch={setSearchString} enterButton/>
            {searchString
                ? <ResultList search={searchString} onSelect={(match) => setSelectedId(match.id)}/>
                : <UsageNotes/>
            }
            {selectedId && <pre>{selectedId}</pre>}
        </Layout.Content>
    </Layout>;
};

export default App;
