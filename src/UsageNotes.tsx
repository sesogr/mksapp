import React, {FC} from "react";
import {Typography} from "antd";
import {EllipsisOutlined} from "@ant-design/icons";

const {Paragraph, Text} = Typography;

type UsageNotesProps = { extended: boolean };
export const UsageNotes: FC<UsageNotesProps> = ({extended}) => extended
    ? <>
        <Paragraph>Diese Mehrfeld-Suche sucht nach Stichwörtern in den entsprechenden Feldern. Dabei wird (pro Feld) unterstützt:</Paragraph>
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
        </ul>
        <Paragraph>
            Sollte(n) ein oder mehrere Ergebnisse alle Suchbegriffe voll erfüllen, werden nur sie angezeigt.
            Andernfalls werden alle Ergbnisse die mindestens ein Suchbegriff beinhalten angezeigt.
        </Paragraph>
        <Paragraph>
            Es gibt aber auch eine einzeilige Suche, welche in jeglichen Detailinformationen zu einem Schlager sucht,
            die über die Schaltfläche
            <Text keyboard>Einzeilige Suche</Text>
            zu erreichen ist.
        </Paragraph>
    </>
    : <>
        <Text>Diese einzeilige Suche durchsucht jegliche Detailinformationen zu einem Schlager und unterstützt:</Text>
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
            Sollte(n) ein oder mehrere Ergebnisse alle Suchbegriffe voll erfüllen, werden nur sie angezeigt.
            Andernfalls werden alle Ergbnisse die mindestens ein Suchbegriff beinhalten angezeigt.
        </Paragraph>
        <Paragraph>
            Es gibt aber auch eine Mehrfeld-Suche, die über die Schaltfläche
            <Text keyboard><EllipsisOutlined/></Text>
            zu erreichen ist.
        </Paragraph>
    </>;
