import React from "react"
import { useEffect } from "react";
import {
    Container,
    Segment,
    Image,
    Grid,
    GridRow,
    GridColumn
} from "semantic-ui-react";
import './Sobre.css'
import adm from "../../../assets/adm.png"
import mission from "../../../assets/mission.png"
import valores from "../../../assets/valores.png"
import visao from "../../../assets/visao.png"
import Header from "../../../components/Header"
import { useMediaQuery } from 'react-responsive';
function Sobre() {
    useEffect(() => {
        window.scrollTo(0, 0); // Rola para o topo ao montar o componente
      }, []);
    

    // Media query hooks
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });

    return (
        <>
            <Header title1={"Nossa"} title2={"História"} />
            <div className="container-image-sobre">
                <div className="image-container-sobre">
                    <Image centered src={adm} size="large" />
                </div>
                <div className="background-overlay-sobre"></div>
            </div>

            <div className="container-sobre">
                <p>
                    Com o intuito de promover acolhimento e ajudar pessoas carentes e situação de rua com a entrega de alimentos prontos e doações de cestas básicas. Nasce a Instituição Anjo Bom na data de 05/08/2020, localizada atualmente na cidade de Feira de Santana, a instituição conta atualmente com 7 membros para as ações de suas ativiades. Atualmente a nossa instituição não possui um ponto específico, por tanto  nossas reuniões acontecem eventualmente em pontos organizados entre os nossos membros.
                </p>
            </div>

            <Container centered className="container-proposito">
                <Grid >
                    <Grid.Row >
                        <Grid.Column width={6} mobile={16} computer={6} tablet={6}>
                            <div className="container-centered-image-sobre">
                                <Image src={mission} size="medium" className="centered-image-sobre" />
                            </div>
                        </Grid.Column>
                        <Grid.Column width={10} mobile={16} computer={10} tablet={10}>
                            <div className="container-centered-text-sobre">
                                <h1>Missão</h1>
                                <p>
                                    “Promover acolhimento e dignidade a pessoas carentes e em situação de rua por meio da entrega de alimentos prontos e doações de cestas básicas, oferecendo apoio e esperança para uma vida melhor.”
                                </p>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>

            {(isMobile) && (

                <Container centered className="container-proposito-2">
                    <Grid >
                        <Grid.Row >
                            <Grid.Column width={6} mobile={16} computer={6} tablet={6}>
                                <div className="container-centered-image-sobre">
                                    <Image src={valores} size="medium" className="centered-image-sobre" />
                                </div>
                            </Grid.Column>
                            <Grid.Column width={10} mobile={16} computer={10} tablet={10}>
                                <div className="container-centered-text-sobre-2">
                                    <h1>Valores</h1>
                                    <p>
                                        “Ser um modelo de solidariedade e impacto social em Feira de Santana, ampliando nossa capacidade de atender e apoiar a população em situação de vulnerabilidade, com a meta de expandir nossas operações e estabelecer um ponto fixo para fortalecer nossa presença e eficácia na comunidade.”
                                    </p>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>

            )}

            {/* Mostrar para computador ou laptop */}
            {isDesktopOrLaptop && (
                <Container centered className="container-proposito-2">
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10}>
                                <div className="container-centered-text-sobre-2">
                                    <h1>Valores</h1>
                                    <p>
                                        “Ser um modelo de solidariedade e impacto social em Feira de Santana, ampliando nossa capacidade de atender e apoiar a população em situação de vulnerabilidade, com a meta de expandir nossas operações e estabelecer um ponto fixo para fortalecer nossa presença e eficácia na comunidade.”
                                    </p>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <div className="container-centered-image-sobre">
                                    <Image src={valores} size="medium" className="centered-image-sobre" />
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            )}



            <Container centered className="container-proposito">
                <Grid >
                    <Grid.Row >
                        <Grid.Column width={6} mobile={16} computer={6} tablet={6}>
                            <div className="container-centered-image-sobre">
                                <Image src={visao} size="medium" className="centered-image-sobre" />
                            </div>
                        </Grid.Column>
                        <Grid.Column width={10} mobile={16} computer={10} tablet={10}>
                            <div className="container-centered-text-sobre">
                                <h1>Visão</h1>
                                <p>
                                    “ Solidariedade: Compromisso genuíno em ajudar aqueles que estão em situação de necessidade, com empatia, respeito e senso de responsabilidade coletiva. Ela envolve a capacidade de colocar-se no lugar do outro, oferecendo suporte emocional e material sem julgamentos, mas com a intenção de promover o bem-estar e a dignidade humana.”
                                </p>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>



        </>
    )
}

export default Sobre