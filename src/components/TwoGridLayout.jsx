import React from 'react';
import { Container, Grid, GridRow, GridColumn, Image } from 'semantic-ui-react';
import people from "../assets/people.png";
import './TwoGridLayout.css';

function TwoGridLayout() {
    return (

        <>
            <Grid className='r' stackable>
                <GridRow columns={2}>
                    {/* Primeira Grid: Coluna com a imagem e texto */}
                    <GridColumn width={8}>
                        <Grid className='grid-internal-computer'>
                            <GridRow>
                                {/* Desktop: imagem e texto lado a lado */}
                                <GridColumn only='computer' width={6} textAlign="center" className='column-image-internal-computer'>
                                    <Image src={people} size='big' />
                                </GridColumn>
                                <GridColumn only='computer' width={10} className='column-internal-computer'>
                                    <h4>titulo</h4>
                                    <p>data</p>
                                    <p>computer 2 Recentemente tivemos o prazer de realizar uma significativa doação de roupas . </p>
                                </GridColumn>

                                {/* Mobile e Tablet: Imagem em cima e texto embaixo */}
                                <GridColumn only='mobile tablet' width={16} textAlign="center" className='column-image-internal-mobile-tablet'>
                                    <Image centered src={people} size='small' />
                                </GridColumn>
                                <GridColumn only='mobile tablet' width={16} className='column-internal-mobile-tablet'>
                                    <h4>titulo</h4>
                                    <p>data</p>
                                    <p>mobile  1 Recentemente tivemos o prazer de realizar uma significativa doação de roupas . </p>
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    </GridColumn>

                    {/* Segunda Grid: Coluna com a imagem e texto */}
                    <GridColumn width={8}>
                        <Grid className='grid-internal-computer'>
                            <GridRow>
                                {/* Desktop: imagem e texto lado a lado */}
                                <GridColumn only='computer' width={6} textAlign="center"  className='column-image-internal-computer'>
                                    <Image src={people} size='big' />
                                </GridColumn>
                                <GridColumn only='computer' width={10} className='column-internal-computer'>
                                    <h4>titulo</h4>
                                    <p>data</p>
                                    <p>computer 2 Recentemente tivemos o prazer de realizar uma significativa doação de roupas . </p>
                                </GridColumn>

                                {/* Mobile e Tablet: Imagem em cima e texto embaixo */}
                                <GridColumn only='mobile tablet' width={16} textAlign="center" className='column-image-internal-mobile-tablet' >
                                    <Image centered src={people} size='small' />
                                </GridColumn>
                                <GridColumn only='mobile tablet' width={16} className='column-internal-mobile-tablet'>
                                    <h4>titulo</h4>
                                    <p>data</p>
                                    <p>mboile 2 Recentemente tivemos o prazer de realizar uma significativa doação de roupas . </p>
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    </GridColumn>
                </GridRow>
            </Grid>





        </>
    );
}

export default TwoGridLayout;
