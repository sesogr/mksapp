import React, {FC, useState} from 'react';
import {Input, Layout} from "antd";
import {ResultList} from "./ResultList";
import {UsageNotes} from "./UsageNotes";

const {Search} = Input;

const App: FC = () => {
    const [searchString, setSearchString] = useState('');
    return <Layout>
        <Layout.Content>
            <Search allowClear onSearch={setSearchString} enterButton/>
            {searchString
                ? <ResultList search={searchString}/>
                : <UsageNotes/>
            }
        </Layout.Content>
    </Layout>;
};

export default App;
