import React from 'react';
import { Grid, GridColumn, Image, Segment } from 'semantic-ui-react';
import Header from '../../components/Header';
import maps from "../../assets/maps.png";
import './PontosColeta.css'; // Importa o arquivo CSS externo

const PontosColeta = () => {
    // Array com os dados dos pontos de coleta
    const pontos = [
        {
            nome: 'Ponto Raposo Shopping - Jardim Bela Vista',
            meta: 'Feira de Santana Endereco: Rodovia Raposo Tavares KM 14, 153 ao km 18 201 - lado ímpar - Jardim Arpoador,São Paulo,SP Horário: Das 10:00 as 22:00 - Segunda a sábado / Das 12:00 as 20:00',
            image: '/images/avatar/large/steve.jpg',
            googleMapsLink: 'https://maps.google.com'
        },
        {
            nome: 'Ponto Raposo Shopping - Jardim Bela Vista',
            meta: 'Feira de Santana Endereco: Rodovia Raposo Tavares KM 14, 153 ao km 18 201 - lado ímpar - Jardim Arpoador,São Paulo,SP Horário: Das 10:00 as 22:00 - Segunda a sábado / Das 12:00 as 20:00',
            image: '/images/avatar/large/steve.jpg',
            googleMapsLink: 'https://maps.google.com'
        },
        {
            nome: 'Ponto Raposo Shopping - Jardim Bela Vista',
            meta: 'Feira de Santana Endereco: Rodovia Raposo Tavares KM 14, 153 ao km 18 201 - lado ímpar - Jardim Arpoador,São Paulo,SP Horário: Das 10:00 as 22:00 - Segunda a sábado / Das 12:00 as 20:00',
            image: '/images/avatar/large/steve.jpg',
            googleMapsLink: 'https://maps.google.com'
        },
        {
            nome: 'Ponto Raposo Shopping - Jardim Bela Vista',
            meta: 'Feira de Santana Endereco: Rodovia Raposo Tavares KM 14, 153 ao km 18 201 - lado ímpar - Jardim Arpoador,São Paulo,SP Horário: Das 10:00 as 22:00 - Segunda a sábado / Das 12:00 as 20:00',
            image: '/images/avatar/large/steve.jpg',
            googleMapsLink: 'https://maps.google.com'
        },
        
    ];

    return (
        <div>
            <Header title1={"Pontos de"} title2={"Coleta"} />
            <Grid stackable columns={2} className="pontos-grid">
                {pontos.map((ponto, index) => (
                    <GridColumn key={index} className="pontos-column">
                        <Segment className="pontos-segment">
                            <Grid className='pontos-grid'>
                                {/* Primeira coluna (Texto e Meta) */}
                                <GridColumn width={12} mobile={16} computer={12} className="pontos-text">
                                    <h4>{ponto.nome}</h4>
                                    <p>{ponto.meta}</p>
                                </GridColumn>

                                {/* Segunda coluna (Imagem e Link) */}
                                <GridColumn width={4} mobile={16} computer={4} className="pontos-image">
                                    <Image  centered src={maps} size='tiny' className="pontos-img" />
                                    <p>
                                        <a className='pontos-image-p' href={ponto.googleMapsLink} target="_blank" rel="noopener noreferrer">
                                            Clique aqui para abrir no Google Maps
                                        </a>
                                    </p>
                                </GridColumn>
                            </Grid>
                        </Segment>
                    </GridColumn>
                ))}
            </Grid>
        </div>
    );
};

export default PontosColeta;
