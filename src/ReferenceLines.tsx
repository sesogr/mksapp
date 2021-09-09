import React, {FC} from "react";
import {Tag} from "antd";
import {AnyReference, AnyReferenceParent} from "./service/songApi";

type ReferenceLinesProps = { collection?: AnyReference[], parentPropertyName: keyof AnyReferenceParent, fallback?: string | null };
export const ReferenceLines: FC<ReferenceLinesProps> = ({collection, parentPropertyName, fallback}) => <>{
    collection
        ?.flatMap((r) => [
            r[parentPropertyName]?.name,
            r.annotation && <Tag>{r.annotation}</Tag>,
            <br/>
        ])
        .slice(0, -1) || fallback
}</>;
