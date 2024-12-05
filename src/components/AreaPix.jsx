import React, { useState } from 'react';
import { Container, Grid, GridColumn, Form, Radio, Button } from 'semantic-ui-react';
import axios from "axios";
import Swal from "sweetalert2";
import './AreaPix.css'; // Certifique-se de que o arquivo CSS está no mesmo diretório


function AreaPix() {

  const [selectedValue, setSelectedValue] = useState(null); // Para valores do rádio
  const [customValue, setCustomValue] = useState(""); // Para o valor digitado no input

  const handleRadioChange = (e, { value }) => {
    setSelectedValue(parseFloat(value)); // Certifique-se de armazenar como número
    setCustomValue(""); // Limpar o input se o rádio for selecionado
  };

  const handleInputChange = (e) => {
    setCustomValue(e.target.value); // Atualizar valor digitado
    setSelectedValue(null); // Desmarcar o rádio se o input for usado
  };

  const handleSubmit = async () => {
    // Verificar se há valor de rádio ou input
    const donationValue = customValue
      ? parseFloat(customValue.replace(",", "."))
      : selectedValue;

    if (!donationValue || donationValue <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Atenção",
        text: "Por favor, selecione ou digite um valor válido para doar.",
        showConfirmButton: false,
        timer: 3000, // 3 segundos
      });
      return;
    }

    const payload = {
      // amount: Math.round(donationValue * 100), // Converter para centavos
      amount: donationValue, // Já está em reais
      email: "example@example.com",
      name: "João Silva",
      phone: "5511999999999",
      message: "Doação para a causa X",
    };

    console.log("value AreaPix: ", payload.amount);

    try {
      const response = await axios.post("https://apianjobom.victordev.shop/doador/DoacaoPix", payload);

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Sucesso",
          text: "Doação realizada com sucesso!",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Ocorreu um erro ao realizar a doação. Tente novamente.",
          showConfirmButton: false,
          timer: 2000,
        });
      }

      console.log("Essa é a a resposta do pix: ", response);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro na comunicação com o servidor. Tente novamente mais tarde.",
        showConfirmButton: false,
        timer: 2000,
      });
      console.error(error);
    }
  };

  return (
    <Container className="content">
      <Grid columns={2} padded>
        <GridColumn className="gridColum01" verticalAlign="middle">
          <div className="segment-donation">
            <h4>Escolha um valor:</h4>
            <Form>
              <Form.Field className="formField-container-areaPix">
                <Radio
                  toggle
                  label={<label className="labelNumberPix">R$ 5,00</label>}
                  name="radioGroup"
                  value={5} // Armazenar como número
                  checked={selectedValue === 5}
                  onChange={handleRadioChange}
                />
              </Form.Field>
              <Form.Field className="formField-container-areaPix">
                <Radio
                  toggle
                  label={<label className="labelNumberPix">R$ 10,00</label>}
                  name="radioGroup"
                  value={10} // Armazenar como número
                  checked={selectedValue === 10}
                  onChange={handleRadioChange}
                />
              </Form.Field>
              <Form.Field className="formField-container-areaPix">
                <Radio
                  toggle
                  label={<label className="labelNumberPix">R$ 20,00</label>}
                  name="radioGroup"
                  value={20} // Armazenar como número
                  checked={selectedValue === 20}
                  onChange={handleRadioChange}
                />
              </Form.Field>
              <Form.Field className="formField-container-areaPix">
                <Radio
                  toggle
                  label={<label className="labelNumberPix">R$ 50,00</label>}
                  name="radioGroup"
                  value={50} // Armazenar como número
                  checked={selectedValue === 50}
                  onChange={handleRadioChange}
                />
              </Form.Field>
              <p>Doar outro valor:</p>
              <Form.Input
                placeholder="R$ 1,00"
                value={customValue}
                onChange={handleInputChange}
              />
            </Form>
          </div>
          <div className="container-continuar-btn-radio-group">
            <Button
              className="continuar-btn-radio-group"
              type="button"
              onClick={handleSubmit}
            >
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
