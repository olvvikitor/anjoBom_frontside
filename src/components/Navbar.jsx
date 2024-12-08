import React, { useState, useEffect } from 'react';
import { Menu, Container, Image, Dropdown, Sidebar, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'; // Importando o useMediaQuery
import logo from "../assets/logo.png";
import "./Navbar.css"

function Navbar() {
    const [visible, setVisible] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const isDesktopOrTablet = useMediaQuery({ query: '(min-width: 768px)' });

    const toggleSidebar = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {isDesktopOrTablet && (
                <Menu secondary fixed="top" className={`main-navbar-desktop ${scrolled ? "main-navbar-scrolled" : ""}`}>
                    <Container>
                        <Link to="/">
                            <Image src={logo} size="tiny" className="main-navbar-logo" />
                        </Link>
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
            )}

            {isMobile && (
                <Menu className={`main-navbar-mobile ${scrolled ? "main-navbar-scrolled" : ""}`}>
                    <Image src={logo} size="tiny" />
                    <Menu.Menu position="right">
                        <Button icon onClick={toggleSidebar} className="main-navbar-toggle-button">
                            <Icon name="align justify" />
                        </Button>
                    </Menu.Menu>
                </Menu>
            )}

            <Sidebar
                as={Menu}
                animation="overlay"
                direction="left"
                inverted
                onHide={() => setVisible(false)}
                vertical
                visible={visible}
                className="main-navbar-sidebar"
            >
                <Link to="/">
                    <Image src={logo} size="tiny" />
                </Link>
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
        </>
    );
}

export default Navbar;
