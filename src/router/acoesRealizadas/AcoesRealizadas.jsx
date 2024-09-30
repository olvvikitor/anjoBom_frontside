import React from "react";
import { Grid, GridRow, GridColumn, Image } from 'semantic-ui-react';
import people from "../../assets/people.png";
import './AcoesRealizadas.css';
import Header from "../../components/Header";

function AcoesRealizadas() {
    const dadosAcoesRealizadas = [
        {
            title: "Anjo bom realiza",
            date: "15 / 02 / 200 ",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor sint voluptatem dolores nulla sunt aliquid perspiciatis veritatis. Quisquam iste, voluptatum maiores dicta atque repudiandae nam perspiciatis et repellendus tenetur ea. ggggg g Quisquam iste, voluptatum maiores dicta atque  Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque  "
        },
        {
            title: "Anjo bom realiza",
            date: "15 / 02 / 200 ",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor sint voluptatem dolores nulla sunt aliquid perspiciatis veritatis. Quisquam iste, voluptatum maiores dicta atque repudiandae nam perspiciatis et repellendus tenetur ea. ggggg g Quisquam iste, voluptatum maiores dicta atque  Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque  "
        },
        {
            title: "Anjo bom realiza",
            date: "15 / 02 / 200 ",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor sint voluptatem dolores nulla sunt aliquid perspiciatis veritatis. Quisquam iste, voluptatum maiores dicta atque repudiandae nam perspiciatis et repellendus tenetur ea. ggggg g Quisquam iste, voluptatum maiores dicta atque  Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque Quisquam iste, voluptatum maiores dicta atque  "
        }

    ];

    return (
        <>
            <Header title1={"Ações"} title2={"Realizadas"} />
            {dadosAcoesRealizadas.map((acoes, index) => (
                <Grid key={index} className="container-all-acoes-realizadas">
                    <GridRow columns={2} className="row-all-acoes-realizadas">
                        <GridColumn className="column-all-acoes-realizadas-image" computer={4} mobile={16}>
                            <Image centered src={people} size='medium' />
                        </GridColumn>
                        <GridColumn className="column-all-acoes-realizadas-text" computer={12} mobile={16}>
                            <h4>{acoes.title}</h4>
                            <p>{acoes.date}</p>
                            <p>{acoes.content}</p>
                        </GridColumn>
                    </GridRow>
                </Grid>
            ))}
            
        </>
    );
}

export default AcoesRealizadas;
