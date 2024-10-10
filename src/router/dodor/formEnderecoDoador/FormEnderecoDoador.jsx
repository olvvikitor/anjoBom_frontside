import React, { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import axios from "axios";
import Swal from 'sweetalert2';
import {
    Form,
    FormInput,
    FormGroup,
    Button
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import "../formEnderecoDoador/FormEnderecoDoador.css";
import HeaderT from "../../../components/Header";
import { Link } from "react-router-dom";


function FormEnderecoDoador() {
    return (
        <>
            <HeaderT title1={"Agende sua"} title2={"Doação"} />
            <div className="container-external-enderecoDoador">
                <div className="container-enderecoDoador-internal-title">
                    <h3>Olá, Pedro <br /> Seja bem-vindo!</h3>
                </div>
                <div className="container-enderecoDoador-internal-main">
                    <Form>
                        <FormInput
                            fluid
                            label={<label className="blue-label">CEP</label>}
                            placeholder="Digite seu CEP"
                            type="text"
                            maxLength={9}
                        />
                        <FormInput
                            fluid
                            label={<label className="blue-label">Rua</label>}
                            placeholder="Digite sua rua"
                            type="text"
                            maxLength={30}
                        />
                        <FormGroup widths="equal">
                            <FormInput
                                fluid
                                label={<label className="blue-label">Cidade</label>}
                                placeholder="Digite sua cidade"
                                type="text"
                                maxLength={30}
                            />
                            <FormInput
                                fluid
                                label={<label className="blue-label">Bairro</label>}
                                placeholder="Digite seu bairro"
                                type="text"
                                maxLength={30}
                            />
                        </FormGroup>
                        <FormGroup widths="equal">
                            <FormInput
                                fluid
                                label={<label className="blue-label">Estado</label>}
                                placeholder="Digite seu estado"
                                type="text"
                                maxLength={2}
                            />
                            <FormInput
                                fluid
                                label={<label className="blue-label">Número</label>}
                                placeholder="Digite o número de sua residência"
                                type="text"
                                maxLength={6}
                            />
                        </FormGroup>
                    </Form>
                </div>
                <div className="container-enderecoDoador-internal-footer">
                    <Button type="submit" className="btn-editar-enderecoDoador">
                        Editar
                    </Button>
                    <Button type="submit" className="btn-confirmar-enderecoDoador">
                        <Link to="/categoriaDoacao">
                            Confirmar
                        </Link>
                    </Button>
                </div>

            </div>
        </>
    )
}

export default FormEnderecoDoador;