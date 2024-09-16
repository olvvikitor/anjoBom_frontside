import React from 'react';
import { Container, Grid, GridColumn, Image } from 'semantic-ui-react';
import "semantic-ui-css/semantic.min.css";
import './QrCode.css';

import qrCode from "../assets/qr-code.png";
import pix from "../assets/pix.png";

function QrCode() {
    return (
        <>
            <Container className='container-qr-code'>
                <Grid centered>
                    <GridColumn className='qrCodeContent' verticalAlign="middle" textAlign="center">
                        <div className='qrCodeText'>
                            <p>Ajude financeiramente</p>
                            <Image centered src={qrCode} size="small" />
                            <p>Pedro Paulo Martins de Queiroz</p>
                            <p>Nubank</p>
                            <Image centered src={pix} size="tiny" />
                        </div>
                    </GridColumn>
                </Grid>
            </Container>
        </>
    )
}

export default QrCode;