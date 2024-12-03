import React from "react";
import { useLocation, Link } from "react-router-dom"; // Hook para capturar os dados passados
import { Grid, GridRow, GridColumn, Image, ImageGroup, Icon } from "semantic-ui-react";
import "./DetalhesAcoesRealizadas.css";
import Header from "../../../../components/Header";

function DetalhesAcoesRealizada() {
    const { state } = useLocation(); // Pega os dados enviados pela navegação
    const { acao } = state || {}; // Extrai os dados do evento

    if (!acao) {
        return <h1>Evento não encontrado</h1>; // Fallback caso não haja dados
    }

    return (
        <>
            <Header title1={"Ações"} title2={"Realizadas"} />
            <div className="detalhes-acao-container">
                <Grid>
                    <GridRow>
                        <GridColumn>
                            <h2 className="titulo-detalhes-acao">{acao.titulo}</h2>

                            <h3>Endereço</h3>
                            {acao.address && (
                                <div className="detalhes-endereco">
                                    <p><strong>Rua:</strong> {acao.address.rua}, {acao.address.numero}</p>
                                    <p><strong>Bairro:</strong> {acao.address.bairro}</p>
                                    <p><strong>Cidade:</strong> {acao.address.cidade} - {acao.address.estado}</p>
                                    <p><strong>CEP:</strong> {acao.address.cep}</p>
                                </div>
                            )}
                            <h3>Datas</h3>
                            <p><strong>Início:</strong> {new Date(acao.data_inicio).toLocaleDateString()}</p>
                            <p><strong>Fim:</strong> {new Date(acao.data_fim).toLocaleDateString()}</p>
                            <h3>Descrição</h3>
                            <p>{acao.descricao}</p>
                            <h3>Imagens</h3>
                            <ImageGroup size="tiny">
                                {acao.photosUrl.map((url, index) => (
                                    <Image key={index} src={url} />
                                ))}
                            </ImageGroup>
                            <Link to="/acoesRealizadas">
                                <Icon name="arrow left" size="large"/>
                            </Link>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </div>
        </>
    );
}

export default DetalhesAcoesRealizada;
