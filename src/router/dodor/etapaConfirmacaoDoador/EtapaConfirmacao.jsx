import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Importa o hook de navegação
import axios from "axios";
import Swal from 'sweetalert2';
import {
    Button,
    Icon,
    Input
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import '../etapaConfirmacaoDoador/EtapaConfirmacao.css';
import HeaderT from "../../../components/Header";
import { Link } from "react-router-dom";

function EtapaConfirmacao() {
    const [codigoEtapaVerificacao, setCodigoEtapaVerificacao] = useState('');
    const navigate = useNavigate(); // Instância do hook de navegação
    const location = useLocation(); // Hook para acessar o estado passado pela navegação

    const handleChange = (e) => {
        setCodigoEtapaVerificacao(e.target.value);
    };

    const enviarCodigo = async () => {
        
        try {
            console.log("Código de verificação:", codigoEtapaVerificacao);
            
            
            const phone = location.state?.phone; // Recupera o número do estado passado

            if (!phone) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Número de telefone não encontrado. Por favor, tente novamente.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }

            // Envia a requisição para a rota com o número na URL e o código no corpo
            const response = await axios.post(
                `https://apianjobom.victordev.shop/doador/sucesso/${phone}`,
                {
                    codigo: codigoEtapaVerificacao // Corpo da requisição com o código
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Código verificado com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                .then(() => {
                    navigate(`/formEnderecoDoador`);
                });
            }
            console.log("Deu bom demais...")
        } catch (error) {
            console.error("Erro ao enviar o código de verificação:", error);
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu um erro ao verificar o código. Tente novamente.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
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
                    <p className="p-info-envio-sms">Enviamos um código por SMS </p>
                    <Input
                        name="codigoEtapaVerificacao"
                        value={codigoEtapaVerificacao}
                        onChange={handleChange}
                        placeholder="Digite o código"
                    />
                    <Button
                        type="submit"
                        className="btn-verificar-etapaConfirmacao"
                        onClick={enviarCodigo}
                    >
                        Verificar
                    </Button>
                    <p><Link to="/agendaDoacao">voltar</Link></p>
                    <p>Não recebeu o código?
                        <span> Reenviar código</span>
                    </p>
                </div>
            </div>
        </>
    );
}

export default EtapaConfirmacao;
