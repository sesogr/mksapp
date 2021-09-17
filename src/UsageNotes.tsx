import React, {FC} from "react";
import {Typography} from "antd";
import {EllipsisOutlined} from "@ant-design/icons";

const {Paragraph, Text} = Typography;

type UsageNotesProps = { extended: boolean };
export const UsageNotes: FC<UsageNotesProps> = ({extended}) => extended
    ? <>
        <Paragraph>Diese Mehrfeld-Suche sucht nach Stichwörtern in den entsprechenden Feldern.</Paragraph>
        <Paragraph>
            Es gibt aber auch eine einzeilige Suche in jeglichen Detailinformationen zu einem Schlager,
            die über die Schaltfläche
            <Text keyboard><EllipsisOutlined/></Text>
            zu erreichen ist.
        </Paragraph>
    </>
    : <>
        <Text>Diese einzeilige Suche durchsucht jegliche Detailinformationen zu einem Schlager und unterstützt</Text>
        <ul>
            <li>
                Kombinationen einfacher Stichwörter, z. B.
                <Text keyboard>märchen glück</Text>
            </li>
            <li>
                Phrasen in doppelten Anführungszeichen, z. B.
                <Text keyboard><Text strong>"am Himmel"</Text> Operette</Text>
            </li>
            <li>
                Ausschluss von Wörtern/Phrasen mit Minus, z. B.
                <Text keyboard>Frühling <Text strong>-Wien</Text></Text>
            </li>
            {/*<li>
            Bereiche mit Zwei- oder Dreipunkt-Ellipse (../...), z. B.
            <Text keyboard>Mond <Text strong>1927..1928</Text></Text>
        </li>*/}
            {/*<li>
            automatische Umschaltung auf ODER-Verknüpfung,
            wenn UND-Kombination der Stichwörter/Phrasen erfolglos
        </li>*/}
        </ul>
        <Paragraph>
            Es gibt aber auch eine Mehrfeld-Suche, die über die Schaltfläche
            <Text keyboard><EllipsisOutlined/></Text>
            zu erreichen ist.
        </Paragraph>
    </>;
