import React, { useState, useEffect } from 'react';
import { Grid, GridRow, GridColumn, Image } from 'semantic-ui-react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import './TwoGridLayout.css';
import mission from "../assets/mission.png"

function TwoGridLayout() {
    const [eventos, setEventos] = useState([]);

    const isWideScreen = useMediaQuery({ minWidth: 1401 }); // Se largura for maior que 1300


    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await axios.get("https://apianjobom.victordev.shop/eventos");
                setEventos(response.data.slice(0, 2)); // Limita os resultados a no máximo 2 eventos
            } catch (error) {
                console.log("Erro ao buscar eventos: ", error);
            }
        };

        fetchEventos();

        const interval = setInterval(fetchEventos, 5000); // Atualiza a cada 5 segundos

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar
    }, []);

    // Função para truncar a descrição
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    // Verifica se eventos está definido e se tem itens
    if (!eventos || eventos.length === 0) {
        return null; // Não renderiza nada se não houver eventos
    }



    return (
        <Grid className="r" stackable>
            <GridRow columns={eventos.length === 1 ? 1 : 2}>
                {eventos.map((evento) => (
                    <GridColumn
                        key={evento.id}
                        width={8}
                        style={eventos.length === 1 ? { margin: '0 auto', textAlign: 'center' } : {}}
                    >
                        <Grid className="grid-internal-computer">
                            <GridRow>
                                {/* Desktop: imagem e texto lado a lado */}
                                <GridColumn
                                    only="computer"
                                    width={isWideScreen ? 6 : 16} // Largura condicional
                                    textAlign="center"
                                    className={`column-image-internal-computer ${!isWideScreen ? 'mobile-tablet-layout' : ''}`} // Classe condicional
                                    >
                                    <Image
                                        src={
                                            evento.photosUrl && evento.photosUrl.length > 0
                                                ? evento.photosUrl[0]
                                                : 'fallback_image.jpg'
                                        }
                                        size="big"
                                        className={`column-image-internal-computer-image ${!isWideScreen ? 'mobile-tablet-layout-img' : ''}`}
                                    />
                                </GridColumn>
                                <GridColumn 
                                    only="computer" 
                                    width={isWideScreen ? 10 : 16} // Largura condicional
                                    className={`column-internal-computer ${!isWideScreen ? 'mobile-tablet-layout-computer' : ''}`}
                                >
                                    <h4>{evento.titulo}</h4>
                                    <p>Início: <strong className='twogrid-strong'>{new Date(evento.data_inicio).toLocaleDateString()}</strong></p>
                                    <p>Fim: <strong className='twogrid-strong'>{new Date(evento.data_fim).toLocaleDateString()}</strong></p>
                                    <p><strong className='twogrid-strong'>{truncateText(evento.descricao, 100)}</strong></p>
                                </GridColumn>

                                {/* Mobile e Tablet: Imagem em cima e texto embaixo */}
                                <GridColumn
                                    only="mobile tablet"
                                    width={16}
                                    textAlign="center"
                                    className="column-image-internal-mobile-tablet"
                                >
                                    <Image
                                        centered
                                        src={
                                            evento.photosUrl && evento.photosUrl.length > 0
                                                ? evento.photosUrl[0]
                                                : { mission }
                                        }
                                        size="massive"
                                        className='column-image-internal-mobile-tablet-image'
                                    />
                                </GridColumn>
                                <GridColumn only="mobile tablet" width={16} className="column-internal-mobile-tablet">
                                    <h4>{evento.titulo}</h4>
                                    <p>Início: <strong className='twogrid-strong'>{new Date(evento.data_inicio).toLocaleDateString()}</strong></p>
                                    <p>Fim: <strong className='twogrid-strong'>{new Date(evento.data_fim).toLocaleDateString()}</strong></p>
                                    <p><strong className='twogrid-strong'>{truncateText(evento.descricao, 100)}</strong></p>
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    </GridColumn>
                ))}
            </GridRow>
        </Grid>
    );
}

export default TwoGridLayout;
