import React, { useState } from 'react';
import { Container, Grid, GridColumn, Form, Radio, Button } from 'semantic-ui-react';
import './AreaPix.css'; // Certifique-se de que o arquivo CSS está no mesmo diretório


function AreaPix() {

  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioChange = (e, { value }) => {
    // Se o valor atual for igual ao valor selecionado, desmarque-o
    if (selectedValue === value) {
      setSelectedValue(null); // Desmarcar
    } else {
      setSelectedValue(value); // Marcar o novo valor
    }
  };;

  return (
    <Container className="content">
      <Grid columns={2} padded>
        <GridColumn className="gridColum01" verticalAlign="middle">
          <div className="segment-donation">
            <h4>Escolha um valor:</h4>
            <Form>
              <Form.Field className='formField-container-areaPix'>
                <Radio
                  toggle
                  label={<label className='labelNumberPix'>R$ 5,00</label>}
                  name="radioGroup"
                  value="5"
                  checked={selectedValue === '5'}
                  onChange={handleRadioChange}
                />
              </Form.Field>
              <Form.Field className='formField-container-areaPix'>
                <Radio
                  toggle
                  label={<label className='labelNumberPix'>R$ 10,00</label>}
                  name="radioGroup"
                  value="10"
                  checked={selectedValue === '10'}
                  onChange={handleRadioChange}
                />
              </Form.Field>
              <Form.Field className='formField-container-areaPix'>
                <Radio
                  toggle
                  label={<label className='labelNumberPix'>R$ 20,00</label>}
                  name="radioGroup"
                  value="20"
                  checked={selectedValue === '20'}
                  onChange={handleRadioChange}
                />
              </Form.Field>
              <Form.Field className='formField-container-areaPix'>
                <Radio
                  toggle
                  label={<label className='labelNumberPix'>R$ 50,00</label>}
                  name="radioGroup"
                  value="50"
                  checked={selectedValue === '50'}
                  onChange={handleRadioChange}
                />
              </Form.Field>
              <p>Doar outro valor:</p>
              <Form.Input
                placeholder="R$ 1,00"
              />
            </Form>
          </div>
          <div className='container-continuar-btn-radio-group'>
            <Button className='continuar-btn-radio-group' type="submit">
              Continuar
            </Button>
          </div>
        </GridColumn>
        <GridColumn className="gridColum02" verticalAlign="middle" textAlign="center">
          <div className="no-segment-no-image">
            <h2>Sua doação pode <br /> mudar vidas!</h2>
            <p>
              Precisamos de doações financeiras para comprar alimentos, itens de higiene e, ainda, aquisição e manutenção de equipamentos hospitalares.
              Sua contribuição será um reforço para levar conforto, curar e salvar vidas.
            </p>
            <div className='p2'>
              <p>Ajude a instituição Anjo Bom! É fácil e sem burocracia.</p>
            </div>
          </div>
        </GridColumn>
      </Grid>
    </Container>
  );
};

export default AreaPix;
