import React from 'react';
import { Container, Grid, GridColumn, Image } from 'semantic-ui-react'; 
import "semantic-ui-css/semantic.min.css";
import "./NoQrCode.css";

function NoQrCode() {
    return (
        <>
        <Container className="small-text-container">
            <Grid centered>
                <GridColumn verticalAlign="middle" textAlign="center">
                    <div>
                        <h2>Sua doação pode mudar vidas!</h2>
                        <p>
                            Precisamos de doações financeiras para comprar alimentos, itens de higiene e, ainda, aquisição e manutenção de equipamentos hospitalares.
                            Sua contribuição será um reforço para levar conforto, curar e salvar vidas.
                            <br />
                            Ajude a instituição Anjo Bom! É fácil e sem burocracia.
                        </p>
                    </div>
                </GridColumn>
            </Grid>
        </Container>
        </>
    )
}

export default NoQrCode