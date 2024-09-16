import React from 'react';
import { Container, Grid, GridColumn, Segment, Image } from 'semantic-ui-react';
import './AreaPix.css'; // Certifique-se de que o arquivo CSS está no mesmo diretório

import qrCode from "../assets/qr-code.png"; 
import pix from "../assets/pix.png";

function AreaPix() {
  return (
    <Container className="content">
      <Grid columns={2} padded>
        <GridColumn className="gridColum01" verticalAlign="middle" textAlign="center">
          <div className="segment-qrCode">
            <p>Ajude financeiramente</p>
            <Image centered src={qrCode} size="small" />
            <p>Pedro Paulo Martins de Queiroz</p>
            <p>Nubank</p>
            <Image centered src={pix} size="tiny" />
          </div>
        </GridColumn>
        <GridColumn className="gridColum02" verticalAlign="middle" textAlign="center">
          <div className="no-segment-no-image">
            <h2>Sua doação pode <br /> mudar vidas!</h2>
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
  );
};

export default AreaPix;
