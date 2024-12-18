import React, { useState, useEffect } from "react";
import { Grid, GridRow, GridColumn, Image, Button, Container, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom"; // Importa o hook de navegação
import axios from "axios";
import "./AcoesRealizadas.css";
import Header from "../../../components/Header";
import logo from "../../../assets/logo.png"

function AcoesRealizadas() {

    const [dadosAcoesRealizadas, setDadosAcoesRealizadas] = useState(null);
    const [visibleCount, setVisibleCount] = useState(2); // Número de itens visíveis inicialmente
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        window.scrollTo(0, 0); // Rola para o topo ao montar o componente
    }, []);

    // useEffect(() => {
    //     fetchEventos();
    // }, []);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await axios.get("https://apianjobom.victordev.shop/eventos");
                setDadosAcoesRealizadas(response.data);
            } catch (error) {
                console.log("Erro ao buscar eventos: ", error);
            }
        };

        fetchEventos();

        const interval = setInterval(fetchEventos, 5000); // Atualiza a cada 5 segundos

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar

    }, []);


    const verMaisSobreAcaoRealizada = (acao) => {
        // Navegar para a página de detalhes com os dados do evento
        navigate("/acoesRealizadas/detalhes", { state: { acao } });
    };

    // Função para truncar a descrição
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    // Função para carregar mais itens
    const carregarMais = () => {
        setVisibleCount((prevCount) => prevCount + 2); // Incrementa em 2 os itens visíveis
    };

    return (
        <>
            <Header title1={"Ações"} title2={"Realizadas"} />
            {!dadosAcoesRealizadas ? (
                <div className='lista-listaAcoesRealizadas-container'>
                    <div className="array-vazio">
                        <h1>No momento não há Ações Realizadas!</h1>
                    </div>
                </div>
            ) : (
                dadosAcoesRealizadas.slice(0, visibleCount).map((acao) => (
                    <Grid key={acao.id} className="container-all-acoes-realizadas">
                        <GridRow columns={2} className="row-all-acoes-realizadas">
                            <GridColumn className="column-all-acoes-realizadas-image" computer={4} mobile={16}>
                                <Image
                                    centered
                                    src={acao.photosUrl && acao.photosUrl.length > 0 ? acao.photosUrl[0] : {logo}}
                                    size="medium"
                                />
                            </GridColumn>
                            <GridColumn className="column-all-acoes-realizadas-text" computer={12} mobile={16}>
                                <h4>{acao.titulo}</h4>
                                <p><strong>Início:</strong> {new Date(acao.data_inicio).toLocaleDateString()}</p>
                                <p><strong>Fim:</strong> {new Date(acao.data_fim).toLocaleDateString()}</p>
                                <p>{truncateText(acao.descricao, 200)}</p> {/* Limita a descrição a 100 caracteres */}
                                <p
                                    onClick={() => verMaisSobreAcaoRealizada(acao)}
                                    className="btn-verMais-acao"
                                    style={{ cursor: "pointer", color: "#2185d0" }}
                                >
                                    Ler mais...
                                </p>
                            </GridColumn>
                        </GridRow>
                    </Grid>
                ))
            )}
            {dadosAcoesRealizadas && visibleCount < dadosAcoesRealizadas.length && (
                <div className="carrega-mais-acoes">
                    <Button onClick={carregarMais} primary>
                        Ver mais
                    </Button>
                </div>
            )}
            <div className="footer-acoesRealizadas">
                <Container>
                    <Grid stackable columns={16} verticalAlign="middle">
                        <Grid.Column className="footer-image" width={4}>
                            <Image src={logo} size='small' centered />
                        </Grid.Column>
                        <Grid.Column className="footer-text" width={8}>
                            <p>Rua Juá, n° 264 - Bosque da Saúde - Feira de Santana - Ba - Cep: 04138-020</p>
                            <p>Informações sobre agendamento de doações: 4003 2299</p>
                            <p>Informações sobre demais assuntos: (75) 5591 7074 </p>
                            <p>2024 - Assistência e Promoção Social Anjo Bom</p>
                            <p>Política de Cookies | Política de Privacidade</p>
                        </Grid.Column>
                        <Grid.Column className="footer-icons" width={4} textAlign="right">
                            <Icon name="facebook" size="large" />
                            <Icon name="twitter" size="large" />
                            <Icon name="instagram" size="large" />
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        </>
    );
}

export default AcoesRealizadas;