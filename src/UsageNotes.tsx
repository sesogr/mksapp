import React, {FC} from "react";
import {Typography} from "antd";

const {Text} = Typography;

export const UsageNotes: FC = () => <>
    <Text>Die Suche unterstützt</Text>
    <ul>
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
</>;