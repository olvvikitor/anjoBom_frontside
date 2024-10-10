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
import '../etapaConfirmacaoDoador/EtapaConfirmacao.css'
import HeaderT from "../../../components/Header";
import { Link } from "react-router-dom";

function EtapaConfirmacao() {

    const [codigoEtapaVerificacao, setCodigoEtapaVerificacao] = useState('');

    const handleChange = (e) => {
        setCodigoEtapaVerificacao(e.target.value);
    };

    const enviar = () => {
        console.log(codigoEtapaVerificacao);
    };
    return (
        <>
            <HeaderT title1={"Agende sua"} title2={"Doação"} />

            <div className="container-etapaConfirmacao">
                <div className="icon-background-etapaConfirmacao">
                    <Icon name="lock" size="big" className="custom-lock-icon" />
                </div>
                <div className="container-etapaConfirmacao-internal">
                    <h3>Etapa de confirmação</h3>
                    <p className="p-info-envio-sms">Enviamos um código por SMS</p>
                    <Input
                        name="codigoEtapaVerificacao"
                        value={codigoEtapaVerificacao}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        className="btn-verificar-etapaConfirmacao"
                        onClick={enviar}
                    >
                        <Link to="/formEnderecoDoador">
                            Verificar
                        </Link>
                    </Button>
                    <p><Link to="/agendaDoacao">voltar</Link></p>
                    <p>Não recebeu o código?
                        <span> Reenviar código</span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default EtapaConfirmacao;