import {StyledDownload} from './styles.jsx';

export function BotaoDownload(props) {
    return (
        <StyledDownload.Link download href={props.href}>
            Baixar
        </StyledDownload.Link>
    )
}