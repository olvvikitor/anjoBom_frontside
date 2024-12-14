import React from "react";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; // Hook para capturar os dados passados
import { Grid, GridRow, GridColumn, Image, ImageGroup, Icon } from "semantic-ui-react";
import "./DetalhesAcoesRealizadas.css";
import Header from "../../../../components/Header";

function DetalhesAcoesRealizada() {
    const { state } = useLocation(); // Pega os dados enviados pela navegação
    const { acao } = state || {}; // Extrai os dados do evento
    const [validUrls, setValidUrls] = useState([]);

    useEffect(() => {
        if (acao?.photosUrl) {
            const checkUrls = async () => {
                const results = await Promise.all(
                    acao.photosUrl.map(async (url) => {
                        try {
                            const response = await fetch(url, { method: "HEAD" }); // Verifica apenas os cabeçalhos
                            if (response.ok) return url;
                        } catch {
                            return null;
                        }
                    })
                );
                setValidUrls(results.filter(Boolean)); // Remove URLs inválidos
            };
            checkUrls();
        }
    }, [acao]);

    if (!acao) {
        return <h1>Evento não encontrado</h1>;

    }

    const handleImageError = (e) => {
        e.target.style.display = "none"; // Oculta a imagem que falhou
    };


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
                                    <p><strong>Rua:</strong> <strong className="detalhes-endereco-strong">{acao.address.rua}, {acao.address.numero}</strong></p>
                                    <p><strong>Bairro:</strong> <strong className="detalhes-endereco-strong">{acao.address.bairro}</strong></p>
                                    <p><strong>Cidade:</strong> <strong className="detalhes-endereco-strong">{acao.address.cidade} - {acao.address.estado}</strong></p>
                                    <p><strong>CEP:</strong> <strong className="detalhes-endereco-strong">{acao.address.cep}</strong></p>
                                </div>
                            )}
                            <h3>Datas</h3>
                            <p><strong>Início:</strong> <strong className="detalhes-endereco-strong">{new Date(acao.data_inicio).toLocaleDateString()}</strong></p>
                            <p><strong>Fim:</strong> <strong className="detalhes-endereco-strong">{new Date(acao.data_fim).toLocaleDateString()}</strong></p>
                            <h3>Descrição</h3>
                            <p><strong className="detalhes-endereco-strong">{acao.descricao}</strong></p>
                            <h3>Imagens</h3>
                            {/* <ImageGroup size="tiny">
                                {acao.photosUrl.map((url, index) => (
                                    <Image key={index} src={url} />
                                ))}
                            </ImageGroup> */}
                            {/* <ImageGroup size="tiny">
                                {validUrls.map((url, index) => (
                                    <Image key={index} src={url} />
                                ))}
                            </ImageGroup> */}
                            <ImageGroup size="tiny">
                                {acao.photosUrl.map((url, index) => (
                                    <Image
                                        key={index}
                                        src={url}
                                        onError={handleImageError} // Oculta a imagem se o carregamento falhar
                                    />
                                ))}
                            </ImageGroup>
                            <Link to="/acoesRealizadas">
                                <Icon name="arrow left" className="icon-left-acoes-detalhes" size="large" />
                            </Link>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </div>
        </>
    );
}

export default DetalhesAcoesRealizada;
