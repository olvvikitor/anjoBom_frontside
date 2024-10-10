import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Importando axios
import { Grid, GridColumn, Image, Segment } from 'semantic-ui-react';
import Header from '../../../components/Header';
import maps from "../../../assets/maps.png";
import './PontosColeta.css'; // Importa o arquivo CSS externo

const PontosColeta = () => {

    const [pontos, setPontos] = useState([]);

    useEffect(() => {

        const fetchPontos = async () => {
            try {
                const response = await axios.get('http://apianjobom.victordev.shop/admin/find-collectionPoints');
                setPontos(response.data);
                console.log("posntos aqui embaixo")
                console.log(pontos);
            } catch (error) {
                console.error('Erro ao buscar os pontos de coleta:', error);
            }
        };

        fetchPontos();  
    }, []); 

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
                                    <h4>{ponto.name}</h4>
                                    <p>{ponto.address.cidade} - {ponto.address.estado} </p>
                                    <p>Endereço: {ponto.address.rua} - {ponto.address.cep} - {ponto.address.bairro}</p>
                                    <p>{ponto.address.numero}</p>
                                </GridColumn>
                                {/* Segunda coluna (Imagem e Link) */}
                                <GridColumn width={4} mobile={16} computer={4} className="pontos-image">
                                    <Image centered src={maps} size='tiny' className="pontos-img" />
                                    <p>
                                        <a className='pontos-image-p' href={ponto.urlMap} target="_blank" rel="noopener noreferrer">
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
