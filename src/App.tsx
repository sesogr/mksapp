import React, {FC, useState} from 'react';
import './App.css';
import {Button, Card, Checkbox, Col, Form, Input, Layout, PageHeader, Row, Typography} from "antd";
import {ResultList} from "./ResultList";
import {UsageNotes} from "./UsageNotes";
import {SearchMatch} from "./service/songApi";
import {DetailView} from "./DetailView";
import {EllipsisOutlined, SearchOutlined} from "@ant-design/icons"

const {Search} = Input;
const {Item, useForm} = Form;

const App: FC = () => {
    const [form] = useForm();
    const [extended, setExtended] = useState(false);
    const [expandToOr, setExpandToOr] = useState(false);
    const [fieldValue, setFieldValue] = useState('');
    const [searchExpression, setSearchExpression] = useState<Record<string, string> | undefined>();
    const [selectedMatch, setSelectedMatch] = useState<SearchMatch | undefined>();
    const toggleSearchMode = () => {
        setExtended((prev) => !prev);
        setExpandToOr(false);
        setSearchExpression(undefined);
    };
    return <Layout>
        <Layout.Content>
            <PageHeader
                title='Schlagerdatenbank'
                subTitle={selectedMatch ? `ID ${selectedMatch.id}` : 'durchsuchen nach'}
                backIcon={selectedMatch ? undefined : false}
                onBack={() => setSelectedMatch(undefined)}
                extra={
                    !selectedMatch && (extended
                        ? <Row>
                            <Col flex={1}/>
                            <Col>
                                <Button
                                    icon={<SearchOutlined/>}
                                    onClick={toggleSearchMode}
                                >Einzeilige Suche</Button>
                            </Col>
                        </Row>
                        : <Search
                            allowClear
                            enterButton
                            addonAfter={
                                <Button onClick={toggleSearchMode} icon={<EllipsisOutlined/>} title='Erweiterte Suche'/>
                            }
                            onSearch={(q) => setSearchExpression(q ? {q} : undefined)}
                            onChange={(event) => setFieldValue(event.target.value)}
                            value={fieldValue}
                        />
                    )
                }
            >
                {!selectedMatch && extended
                    && <Form
                        form={form}
                        // initialValues={{title: 'foo'}}
                        labelCol={{flex: '150px'}}
                        size='small'
                        wrapperCol={{flex: 1}}
                    >
                        <Item name='title' label='Titel'><Input/></Item>
                        <Item name='composer' label='Komponist*innen'><Input/></Item>
                        <Item name='writer' label='Texter*innen'><Input/></Item>
                        <Item name='copyrightYear' label='Copyright (Jahr)'><Input/></Item>
                        <Item name='publisher' label='Verlage'><Input/></Item>
                        <Item name='origin' label='Herkunft'><Input/></Item>
                        <Item name='performer' label='Interpret*innen'><Input/></Item>
                        <Item colon={false} label={[]}>
                            <Button
                                htmlType='submit'
                                onClick={() => {
                                    form.validateFields()
                                        .then((values) => Object.keys(values)
                                            .filter((key) => values[key])
                                            .map((key) => [key, values[key]]))
                                        .then((values) => values.length
                                            && setSearchExpression(values.reduce(
                                                (accu, [key, value]) => ({...accu, [key]: value}),
                                                {}
                                            ))
                                        )
                                }}
                                type='primary'
                            >Suchen…</Button>
                            <Button
                                onClick={() => {
                                    setSearchExpression(undefined);
                                    form.resetFields();
                                }}
                                type='text'
                            >Zurücksetzen</Button>
                        </Item>
                    </Form>
                }
                {!searchExpression && <UsageNotes extended={extended}/>}
            </PageHeader>
            <Card>
                {selectedMatch && <DetailView searchMatch={selectedMatch}/>}
                {searchExpression && <ResultList
                    onSelect={setSelectedMatch}
                    search={{...searchExpression, expandToOr: expandToOr ? '1' : '0'}}
                    style={{display: !searchExpression || selectedMatch ? 'none' : ''}}
                    title={() => (
                        <Checkbox checked={expandToOr} onChange={() => setExpandToOr(prev => !prev)}>
                            Suche ausdehnen (<Typography.Text italic>ODER</Typography.Text>-Verknüpfung)
                        </Checkbox>
                    )}
                />}
            </Card>
        </Layout.Content>
    </Layout>;
};

export default App;
