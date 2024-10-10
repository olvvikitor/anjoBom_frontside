import React, { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import axios from "axios";
import Swal from 'sweetalert2';
import {
    Button,
    Icon,
    Input
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import "./AgendaDoacao.css";
import HeaderT from "../../../components/Header";
import { Link } from "react-router-dom";

function AgendaDoacao() {

    const [verificationNumber, setVerificationNumber] = useState('');

    const handleChange = (e) => {
        setVerificationNumber(e.target.value);
    };

    const enviar = () => {
        console.log(verificationNumber);
    };

    return (
        <>
            <HeaderT title1={"Agende sua"} title2={"Doação"} />

            <div className="container-agendaDoacao">
                <div className="icon-background-agendaDoacao">
                    <Icon name="lock" size="big" className="custom-lock-icon" />
                </div>
                <div className="container-agendaDoacao-internal">
                    <h3>Já possui uma conta?</h3>
                    <p className="p-info-number">Informe seu número</p>
                    <Input
                        placeholder='(75) 9 9999-9999'
                        name="verificationNumber"
                        value={verificationNumber}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        className="btn-verificar-agendaDoacao"
                        onClick={enviar}
                    >
                        <Link to="/etapaConfirmacaoDoador">
                            Verificar
                        </Link>
                    </Button>
                    <p>Não possui uma conta?
                        <Link to="/formDoador">
                            <span> Criar conta</span>
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default AgendaDoacao;
