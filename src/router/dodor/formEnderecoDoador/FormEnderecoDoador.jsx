
import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate} from "react-router-dom";
import { Form, FormInput, FormGroup, Button } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import "../formEnderecoDoador/FormEnderecoDoador.css";
import HeaderT from "../../../components/Header";

function FormEnderecoDoador() {
    const location = useLocation();
    const enderecoEnvi = location.state?.enderecoEnvi || {}; // Garante que sempre será um objeto vazio se undefined
    const [endereco, setEndereco] = useState(enderecoEnvi);

    // Log para verificar se os dados foram carregados corretamente
    useEffect(() => {
        console.log("Endereço carregado: ", endereco);
    }, [endereco]);

    const navigate = useNavigate();

    function irParaCategoriaDoacao() {
        // Redireciona para a rota de categoriaDoacao passando o ID do endereço
        navigate("/categoriaDoacao", { state: { id: enderecoEnvi.id } });
    };

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
                            value={endereco.address.cep || ""} // Evita erro se `cep` for undefined
                            onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })}
                        />
                        <FormInput
                            fluid
                            label={<label className="blue-label">Rua</label>}
                            placeholder="Digite sua rua"
                            type="text"
                            maxLength={30}
                            value={endereco.address.rua || ""}
                            onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })}
                        />
                        <FormGroup widths="equal">
                            <FormInput
                                fluid
                                label={<label className="blue-label">Cidade</label>}
                                placeholder="Digite sua cidade"
                                type="text"
                                maxLength={30}
                                value={endereco.address.cidade || ""}
                                onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
                            />
                            <FormInput
                                fluid
                                label={<label className="blue-label">Bairro</label>}
                                placeholder="Digite seu bairro"
                                type="text"
                                maxLength={30}
                                value={endereco.address.bairro || ""}
                                onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup widths="equal">
                            <FormInput
                                fluid
                                label={<label className="blue-label">Estado</label>}
                                placeholder="Digite seu estado"
                                type="text"
                                maxLength={2}
                                value={endereco.address.estado || ""}
                                onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })}
                            />
                            <FormInput
                                fluid
                                label={<label className="blue-label">Número</label>}
                                placeholder="Digite o número de sua residência"
                                type="text"
                                maxLength={6}
                                value={endereco.address.numero || ""}
                                onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })}
                            />
                        </FormGroup>
                    </Form>
                </div>
                <div className="container-enderecoDoador-internal-footer">
                    <Button type="submit" className="btn-editar-enderecoDoador">
                        Editar
                    </Button>
                    <Button  onClick={irParaCategoriaDoacao} className="btn-confirmar-enderecoDoador">
                        Confirmar
                    </Button>
                </div>
            </div>
        </>
    );
}

export default FormEnderecoDoador;

