import React, { useState, useEffect } from 'react';
import { Grid, Card, Icon, Segment, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Header from '../../components/Header';
import './CategoriaDoacao.css';


const CategoriaDoacao = () => {
    const [quantidadeAlimento, setQuantidadeAlimento] = useState(0);
    const [quantidadeBebida, setQuantidadeBebida] = useState(0);
    const [quantidadeBrinquedo, setQuantidadeBrinquedo] = useState(0);
    const [quantidadeRoupas, setQuantidadeRoupas] = useState(0);
    const [quantidadeMedicamento, setQuantidadeMedicamento] = useState(0);
    const [quantidadeHigienicos, setQuantidadeHigienicos] = useState(0);
    const [itensCarrinho, setItensCarrinho] = useState([]);
    const [carrinhoVisivel, setCarrinhoVisivel] = useState(false); // Estado para controlar a visibilidade do carrinho

    const temItensNoCarrinho =
        quantidadeAlimento > 0 ||
        quantidadeBebida > 0 ||
        quantidadeBrinquedo > 0 ||
        quantidadeRoupas > 0 ||
        quantidadeMedicamento > 0 ||
        quantidadeHigienicos > 0;

    // Atualiza o carrinho quando as quantidades mudam
    useEffect(() => {
        const itens = [];
        if (quantidadeAlimento > 0) itens.push({ nome: 'Alimento', quantidade: quantidadeAlimento });
        if (quantidadeBebida > 0) itens.push({ nome: 'Bebida', quantidade: quantidadeBebida });
        if (quantidadeBrinquedo > 0) itens.push({ nome: 'Brinquedo', quantidade: quantidadeBrinquedo });
        if (quantidadeRoupas > 0) itens.push({ nome: 'Roupas', quantidade: quantidadeRoupas });
        if (quantidadeMedicamento > 0) itens.push({ nome: 'Medicamento', quantidade: quantidadeMedicamento });
        if (quantidadeHigienicos > 0) itens.push({ nome: 'Higiênicos', quantidade: quantidadeHigienicos });
        setItensCarrinho(itens);
    }, [quantidadeAlimento, quantidadeBebida, quantidadeBrinquedo, quantidadeRoupas, quantidadeMedicamento, quantidadeHigienicos]);

    // Função para "Doar"
    const handleDoar = () => {
        console.log("Itens doados:", itensCarrinho);
        alert("Doação realizada com sucesso!");
        // Limpar as quantidades após doar
        setQuantidadeAlimento(0);
        setQuantidadeBebida(0);
        setQuantidadeBrinquedo(0);
        setQuantidadeRoupas(0);
        setQuantidadeMedicamento(0);
        setQuantidadeHigienicos(0);
        setCarrinhoVisivel(false); // Ocultar carrinho após a doação
    };

    const toggleCarrinho = () => {
        setCarrinhoVisivel(!carrinhoVisivel); // Alternar visibilidade do carrinho
    };

    const calcularTotalItens = () => {
        return quantidadeAlimento + quantidadeBebida + quantidadeBrinquedo + quantidadeRoupas + quantidadeMedicamento + quantidadeHigienicos;
    };

    return (
        <>

            <Header title1={"Agende sua"} title2={"Doação"} />
            <div className="container-caregoria-doacao">
                <h1 className="title">Categorias</h1>
                <Grid container stackable columns={3} doubling>
                    <Grid.Column>
                        <Card centered>
                            <Label color='blue' corner="right"><Icon name='star' /></Label>
                            <Card.Content textAlign="center">
                                <Icon name="food" size="huge" color="blue" />
                                <Card.Header className='cardHeader'>Alimentos</Card.Header>
                            </Card.Content>
                            <Card.Content extra>
                                <div className="counter-controls">
                                    <div className="minus-btn" onClick={() => setQuantidadeAlimento(quantidadeAlimento > 0 ? quantidadeAlimento - 1 : 0)}>−</div>
                                    <div>{quantidadeAlimento}</div>
                                    <div className="plus-btn" onClick={() => setQuantidadeAlimento(quantidadeAlimento + 1)}>+</div>
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                    <Grid.Column>
                        <Card centered>
                            <Card.Content textAlign="center">
                                <Icon name="coffee" size="huge" color="blue" />
                                <Card.Header className='cardHeader'>Bebidas</Card.Header>
                            </Card.Content>
                            <Card.Content extra>
                                <div className="counter-controls">
                                    <div className="minus-btn" onClick={() => setQuantidadeBebida(quantidadeBebida > 0 ? quantidadeBebida - 1 : 0)}>−</div>
                                    <div>{quantidadeBebida}</div>
                                    <div className="plus-btn" onClick={() => setQuantidadeBebida(quantidadeBebida + 1)}>+</div>
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                    <Grid.Column>
                        <Card centered>
                            <Card.Content textAlign="center">
                                <Icon name="gamepad" size="huge" color="blue" />
                                <Card.Header className='cardHeader'>Brinquedos</Card.Header>
                            </Card.Content>
                            <Card.Content extra>
                                <div className="counter-controls">
                                    <div className="minus-btn" onClick={() => setQuantidadeBrinquedo(quantidadeBrinquedo > 0 ? quantidadeBrinquedo - 1 : 0)}>−</div>
                                    <div>{quantidadeBrinquedo}</div>
                                    <div className="plus-btn" onClick={() => setQuantidadeBrinquedo(quantidadeBrinquedo + 1)}>+</div>
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                    <Grid.Column>
                        <Card centered>
                            <Card.Content textAlign="center">
                                <Icon name="shopping bag" size="huge" color="blue" />
                                <Card.Header className='cardHeader'>Roupas</Card.Header>
                            </Card.Content>
                            <Card.Content extra>
                                <div className="counter-controls">
                                    <div className="minus-btn" onClick={() => setQuantidadeRoupas(quantidadeRoupas > 0 ? quantidadeRoupas - 1 : 0)}>−</div>
                                    <div>{quantidadeRoupas}</div>
                                    <div className="plus-btn" onClick={() => setQuantidadeRoupas(quantidadeRoupas + 1)}>+</div>
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                    <Grid.Column>
                        <Card centered>
                            <Label color='blue' corner="right"><Icon name='star' /></Label>
                            <Card.Content textAlign="center">
                                <Icon name="medkit" size="huge" color="blue" />
                                <Card.Header className='cardHeader'>Medicamentos</Card.Header>
                            </Card.Content>
                            <Card.Content extra>
                                <div className="counter-controls">
                                    <div className="minus-btn" onClick={() => setQuantidadeMedicamento(quantidadeMedicamento > 0 ? quantidadeMedicamento - 1 : 0)}>−</div>
                                    <div>{quantidadeMedicamento}</div>
                                    <div className="plus-btn" onClick={() => setQuantidadeMedicamento(quantidadeMedicamento + 1)}>+</div>
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                    <Grid.Column>
                        <Card centered>
                            <Card.Content textAlign="center">
                                <Icon name="shower" size="huge" color="blue" />
                                <Card.Header className='cardHeader'>Higiênicos</Card.Header>
                            </Card.Content>
                            <Card.Content extra>
                                <div className="counter-controls">
                                    <div className="minus-btn" onClick={() => setQuantidadeHigienicos(quantidadeHigienicos > 0 ? quantidadeHigienicos - 1 : 0)}>−</div>
                                    <div>{quantidadeHigienicos}</div>
                                    <div className="plus-btn" onClick={() => setQuantidadeHigienicos(quantidadeHigienicos + 1)}>+</div>
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>

                {/* Carrinho fixo no canto inferior direito */}
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-1px',
                        right: '-5px',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: 'red',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        zIndex: 2000,
                    }}>
                        {calcularTotalItens()}
                    </div>
                    <Segment className="cart-icon" onClick={toggleCarrinho} style={{ cursor: 'pointer' }}>
                        <Icon name="shopping cart" size="large" />
                    </Segment>

                    {carrinhoVisivel && temItensNoCarrinho && (
                        <Segment className="cart-segment" raised>
                            <h4>Carrinho</h4>
                            {itensCarrinho.map((item, index) => (
                                <p key={index}>{item.nome}: {item.quantidade}</p>
                            ))}
                            <div className="btn-doar" onClick={handleDoar}>Doar</div>
                        </Segment>
                    )}
                </div>

            </div>
        </>
    );
};

export default CategoriaDoacao;
