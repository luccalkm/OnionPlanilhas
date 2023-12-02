import { StyledDownload } from './styles.jsx';
import { useState, useEffect } from 'react';

export function BotaoDownload(props) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Limpar o estado quando o componente desmontar
        return () => {
            setIsLoading(false);
        };
    }, []);

    const handleClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Realizar a operação de download aqui.
            // Por exemplo, se for necessário fazer uma chamada de API
            // para obter a URL de download, faça aqui.

            // Após concluir o download ou obter a URL:
            setIsLoading(false);
        } catch (error) {
            console.error('Erro no download:', error);
            setIsLoading(false);
        }
    }

    const buttonText = isLoading ? "Carregando..." : "Baixar";

    return (
        <StyledDownload.Link 
            onClick={handleClick}
            onMouseLeave={() => setIsLoading(false)}
            href={props.href}
            download
            aria-label={buttonText}
        >
            {buttonText}
        </StyledDownload.Link>
    );
}
