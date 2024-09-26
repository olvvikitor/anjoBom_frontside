import React, { useState, useEffect } from "react";
import {
    Menu,
    Container,
    Button,
    Icon,
    Sidebar,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Image,
    Header,
    Card,
    CardGroup,
    CardHeader,
    CardContent,
    CardDescription,
    Grid,
    GridColumn,
    GridRow,
    Segment


} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import img from "../assets/img.png";
import logo from "../assets/logo.png";
import Breve from "../assets/breve.png";
import './Initial.css';
import AreaPix from "../components/AreaPix";
import QrCode from "../components/QrCode";
import NoQrCode from "../components/NoQrCode";
import TwoGridLayout from "../components/TwoGridLayout";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

const Initial = () => {
    const [visible, setVisible] = useState(false);
    const [scrolled, setScrolled] = useState(true);



    const toggleSidebar = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    // Media query hooks
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });

    return (
        <>
            {/* Desktop e Tablet Navbar */}
            <Menu secondary fixed="top" className={`desktop-menu ${scrolled ? "scrolled" : ""}`}>
                <Container>
                    <Image src={logo} size="tiny" className="image-logo" />
                    <Menu.Menu position="right">
                        <Link to="/">
                            <Menu.Item className="main-navbar-item" name="Home" />
                        </Link>
                        <Link to="/formDoador">
                            <Menu.Item className="main-navbar-item" name="Doação" />
                        </Link>
                        <Link to="/sobre">
                            <Menu.Item className="main-navbar-item" name="Sobre" />
                        </Link>
                    </Menu.Menu>
                </Container>
            </Menu>

            {/* Mobile Navbar com Toggle */}
            <Menu className={`mobile-menu ${scrolled ? "scrolled" : ""}`}>
                <Image src={logo} size="tiny" />
                <Menu.Menu position="right">
                    <Button icon onClick={toggleSidebar} className="toggle-button">
                        <Icon name="align justify" />
                    </Button>
                </Menu.Menu>
            </Menu>

            {/* Sidebar para mobile */}
            <Sidebar
                as={Menu}
                animation="overlay"
                direction="left"
                inverted
                onHide={() => setVisible(false)}
                vertical
                visible={visible}
                className="sidebar"
            >
                <Image src={logo} size="tiny" />

                <Link to="/">
                    <Menu.Item as="a" onClick={() => setVisible(false)}>
                        Home
                    </Menu.Item>
                </Link>
                <Link to="/formDoador">
                    <Menu.Item as="a" onClick={() => setVisible(false)}>
                        Doação
                    </Menu.Item>
                </Link>
                <Link to="/sobre">
                    <Menu.Item as="a" onClick={() => setVisible(false)}>
                        Sobre
                    </Menu.Item>
                </Link>
            </Sidebar>

            <div className="image-container">
                <Image src={img} fluid />

                {!isMobile && !isTablet && (
                    <div className="overlay-content">
                        <AreaPix />
                    </div>
                )}

                {(isMobile || isTablet) && (
                    <div className="overlay-content">
                        <NoQrCode />
                    </div>
                )}

            </div>
            {(isMobile || isTablet) && (

                <div>
                    <QrCode />
                </div>

            )}
            <Header as='h2' textAlign="center" className="text-como-doar">Como doar ?</Header>
            <CardGroup centered className="card-group">
                <Card className="card">
                    <CardContent>
                        <div className="card-header-container">
                            <span className="card-number">1</span>
                            <CardHeader className="card-header">Alimento</CardHeader>
                        </div>
                        <CardDescription textAlign="center" className="card-descripition">
                            Frutas, legumes, almoço, jantar entre outros insumos para nossos pacientes.
                        </CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <div className="card-header-container">
                            <span className="card-number">2</span>
                            <CardHeader className="card-header">Alimento</CardHeader>
                        </div>
                        <CardDescription textAlign="center" className="card-descripition">
                            Frutas, legumes, almoço, jantar entre outros insumos para nossos pacientes.
                        </CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <div className="card-header-container">
                            <span className="card-number">3</span>
                            <CardHeader className="card-header">Alimento</CardHeader>
                        </div>
                        <CardDescription textAlign="center" className="card-descripition">
                            Frutas, legumes, almoço, jantar entre outros insumos para nossos pacientes.
                        </CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <div className="card-header-container">
                            <span className="card-number">4</span>
                            <CardHeader className="card-header">Alimento</CardHeader>
                        </div>
                        <CardDescription textAlign="center" className="card-descripition">
                            Frutas, legumes, almoço, jantar entre outros insumos para nossos pacientes.
                        </CardDescription>
                    </CardContent>
                </Card>
            </CardGroup>
            <Container textAlign="center" className="container-button">
                <Link to="agendaDoacao">
                    <Button className="btn-action">Agende sua retirada</Button>
                </Link>
                <Link to="pontosColeta">
                    <Button className="btn-action">Ver pontos de coleta</Button>
                </Link>
            </Container>


            <Grid centered className="content-investment">
                <GridRow >
                    <GridColumn textAlign="center" mobile={16} tablet={16} computer={4} className="grid-column-investiment">
                        <Header as='h2' className="text-investment">Onde <br /> investimos</Header>
                    </GridColumn>
                    <GridColumn mobile={16} tablet={16} computer={4} className="grid-column-investiment">
                        <div className="content-icon">
                            <Icon name="bathtub" size="huge" className="icon-investment" />
                        </div>
                        <h3>Higiene</h3>
                        <p>
                            Aceitamos produtos como: Papel higiênico, sabonetes, desodorantes e etc.
                        </p>
                    </GridColumn>
                    <GridColumn mobile={16} tablet={16} computer={4} className="grid-column-investiment">
                        <div className="content-icon">

                            <Icon name="food" size="huge" className="icon-investment" />
                        </div>
                        <h3>Alimento</h3>
                        <p>
                            Agulhas de biópsia, luvas, mascaras, álcool. remédios e seringas.
                        </p>
                    </GridColumn>
                    <GridColumn mobile={16} tablet={16} computer={4} className="grid-column-investiment">
                        <div className="content-icon">
                            <Icon name="first aid" size="huge" className="icon-investment" />
                        </div>
                        <h3>Salvar vidas</h3>
                        <p>
                            Nosso principal intuito é ajudar pessoas e comunidades necessidadas.
                        </p>
                    </GridColumn>
                </GridRow>
            </Grid>


            <Header as='h2' textAlign="center" className="text-como-doar">Ações realizadas</Header>
            <TwoGridLayout />
            <Container textAlign="center" className="container-button-see">
                <Link to="acoesRealizadas">
                    <Button className="btn-inverted">Ver mais</Button>
                </Link>
            </Container>

            <div className="container-breve-historia-1">
                <Container className="container-breve-historia-2">
                    <div className="triangle-top-left"></div>
                    <div className="triangle-bottom-right"></div>
                    <Grid stackable centered>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Image src={Breve} size="medium" />
                            </Grid.Column>
                            <Grid.Column>
                                <div className="texto">
                                    <Header as='h2' className="text-breve-historia">Breve história</Header>
                                    <p>
                                        O Anjo Bom garante que sua doação será destinada somente para o apoio à nossa causa.
                                    </p>
                                    <p>
                                        Quer se juntar a nós? <br />Descubra como você pode contribuir, seja por meio de doações, voluntariado ou parcerias. Também facilitamos o contato para que você possa se envolver e fazer parte dessa jornada conosco.
                                    </p>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        </>
    );
};

export default Initial;
