import { useEffect } from 'react';
import {StyledDownload} from './styles.jsx';

export function BotaoDownload(props) {
    return (
        <StyledDownload.Link download href={props.href}>
            <StyledDownload.Icon className="fas fa-download"></StyledDownload.Icon>
            Baixar
        </StyledDownload.Link>
    )
}