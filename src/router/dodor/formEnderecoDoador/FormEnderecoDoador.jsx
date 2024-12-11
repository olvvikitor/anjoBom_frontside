import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormInput, FormGroup, Button } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import "../formEnderecoDoador/FormEnderecoDoador.css";
import HeaderT from "../../../components/Header";
import Swal from 'sweetalert2';
import axios from "axios";

function FormEnderecoDoador() {
    const location = useLocation();
    const enderecoEnvi = location.state?.enderecoEnvi || {};
    const [endereco, setEndereco] = useState({
        address: {
            cep: "",
            estado: "",
            cidade: "",
            bairro: "",
            rua: "",
            numero: "",
        },
    });
    const [initialEndereco, setInitialEndereco] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    let valid = true;

    useEffect(() => {
        setEndereco(enderecoEnvi);
        setInitialEndereco(enderecoEnvi);
    }, [enderecoEnvi]);

    const formatCEP = (cep) => {
        const cleaned = ('' + cep).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{5})(\d{3})$/);
        return match ? `${match[1]}-${match[2]}` : cleaned;
    };

    const validateCep = async (value) => {
        const formattedCEP = formatCEP(value);
        console.log("CEP formatado:", formattedCEP);

        const newErrors = { ...errors };

        if (!formattedCEP || formattedCEP.length !== 9) {
            newErrors.cep = "CEP deve ter 9 caracteres!";
            setErrors(newErrors);
            return;
        }

        try {
            console.log("Chamando API com CEP:", formattedCEP);
            const response = await axios.get(`https://viacep.com.br/ws/${formattedCEP}/json/`);
            console.log("Resposta da API:", response.data);

            if (response.data && !response.data.erro) {
                setEndereco((prevState) => ({
                    ...prevState,
                    address: {
                        ...prevState.address,
                        rua: response.data.logradouro,
                        bairro: response.data.bairro,
                        cidade: response.data.localidade,
                        estado: response.data.uf,
                        cep: formattedCEP, // Já formatado
                    },
                }));
                delete newErrors.cep;
            } else {
                newErrors.cep = "CEP inválido!";
            }
        } catch (error) {
            console.error("Erro na chamada da API:", error);
            newErrors.cep = "Erro ao validar o CEP!";
        }

        setErrors(newErrors);
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;

        const field = name.split('.')[1]; // Extraindo o campo específico
        const formattedValue = field === "cep" ? formatCEP(value) : value; // Formata o CEP se necessário

        // Atualiza o estado do endereço
        setEndereco((prevState) => ({
            ...prevState,
            address: {
                ...prevState.address,
                [field]: formattedValue,
            },
        }));

        // Validações específicas
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };

            switch (field) {
                case "cep":
                    if (value.length > 9) {
                        newErrors.cep = "Máximo de 9 caracteres.";
                    } else if (value.length === 8) {
                        validateCep(value); // Chama validação de CEP apenas quando o tamanho é adequado
                        delete newErrors.cep;
                    } else {
                        delete newErrors.cep;
                    }
                    break;

                case "estado":
                    if (value.length > 2) {
                        newErrors.estado = "Máximo de 2 caracteres.";
                    } else {
                        delete newErrors.estado;
                    }
                    break;

                case "cidade":
                    if (value.length > 99) {
                        newErrors.cidade = "Máximo de 100 caracteres.";
                    } else {
                        delete newErrors.cidade;
                    }
                    break;

                case "bairro":
                    if (value.length > 99) {
                        newErrors.bairro = "Máximo de 100 caracteres.";
                    } else {
                        delete newErrors.bairro;
                    }
                    break;

                case "rua":
                    if (value.length > 99) {
                        newErrors.rua = "Máximo de 100 caracteres.";
                    } else {
                        delete newErrors.rua;
                    }
                    break;

                case "numero":
                    if (value.length > 7) {
                        newErrors.numero = "Máximo de 7 caracteres.";
                    } else {
                        delete newErrors.numero;
                    }
                    break;

                default:
                    break;
            }

            return newErrors;
        });
    };


    const handleConfirmEdit = async () => {
        const { cep, estado, cidade, bairro, rua, numero } = endereco.address;
        const newErrors = {};

        // Validações obrigatórias
        if (!cep) newErrors.cep = "O CEP é obrigatório!";
        if (!estado) newErrors.estado = "O estado é obrigatório!";
        if (!cidade) newErrors.cidade = "A cidade é obrigatória!";
        if (!bairro) newErrors.bairro = "O bairro é obrigatório!";
        if (!rua) newErrors.rua = "A rua é obrigatória!";
        if (!numero) newErrors.numero = "O número é obrigatório!";
        if (bairro.length > 99) {
            newErrors.bairro = "Máximo de 100 caracteres.";
        }
        if (cidade.length > 99) {
            newErrors.cidade = "Máximo de 100 caracteres.";
        }
        if (rua.length > 99) {
            newErrors.rua = "Máximo de 100 caracteres.";
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return; // Impede o envio se houver erros
        }

        if (valid) {

            try {
                const response = await axios.put(
                    `https://apianjobom.victordev.shop/doador/editarEndereco/${enderecoEnvi.id}`,
                    { cep, estado, cidade, bairro, rua, numero },
                    { headers: { "Content-Type": "application/json" } }
                );

                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Endereço atualizado com sucesso!",
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    setIsEditing(false);
                    setInitialEndereco(endereco);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Erro ao atualizar o endereço.",
                        timer: 3000,
                        showConfirmButton: false,
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Erro ao atualizar o endereço.",
                    text: error.message,
                    timer: 3000,
                    showConfirmButton: false,
                });
            }
        }

    };


    const handleCancelEdit = () => {
        setEndereco(initialEndereco); // Restaura o estado inicial
        setIsEditing(false);
    };

    console.log("veja como esta vindo o endereco, ", endereco);

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
                            error={errors.cep ? { content: errors.cep} : null}
                            placeholder="Digite seu CEP"
                            value={endereco.address.cep}
                            readOnly={!isEditing}
                            name="address.cep"
                            maxLength={9}
                            onChange={isEditing ? handleChange : null}
                        />
                        <FormInput
                            fluid
                            label={<label className="blue-label">Rua</label>}
                            error={errors.rua ? { content: errors.rua} : null}
                            placeholder="Digite sua rua"
                            value={endereco.address.rua}
                            readOnly={!isEditing}
                            name="address.rua"
                            maxLength={100}
                            onChange={isEditing ? handleChange : null}
                        />
                        <FormGroup widths="equal">
                            <FormInput
                                fluid
                                label={<label className="blue-label">Cidade</label>}
                                error={errors.cidade ? { content: errors.cidade} : null}
                                placeholder="Digite sua cidade"
                                value={endereco.address.cidade}
                                readOnly={!isEditing}
                                name="address.cidade"
                                maxLength={100}
                                onChange={isEditing ? handleChange : null}
                            />
                            <FormInput
                                fluid
                                label={<label className="blue-label">Bairro</label>}
                                error={errors.bairro ? { content: errors.bairro} : null}
                                placeholder="Digite seu bairro"
                                value={endereco.address.bairro}
                                readOnly={!isEditing}
                                name="address.bairro"
                                maxLength={100}
                                onChange={isEditing ? handleChange : null}
                            />
                        </FormGroup>
                        <FormGroup widths="equal">
                            <FormInput
                                fluid
                                label={<label className="blue-label">Estado</label>}
                                error={errors.estado ? { content: errors.estado} : null}
                                placeholder="Digite seu estado"
                                value={endereco.address.estado}
                                readOnly={!isEditing}
                                name="address.estado"
                                maxLength={2}
                                onChange={isEditing ? handleChange : null}
                            />
                            <FormInput
                                fluid
                                label={<label className="blue-label">Número</label>}
                                error={errors.numero ? { content: errors.numero} : null}
                                placeholder="Digite o número da residência"
                                value={endereco.address.numero}
                                readOnly={!isEditing}
                                name="address.numero"
                                maxLength={7}
                                onChange={isEditing ? handleChange : null}
                            />
                        </FormGroup>
                    </Form>
                </div>
                <div className="container-enderecoDoador-internal-footer">
                    {isEditing ? (
                        <>
                            <Button onClick={handleCancelEdit} className="btn-cancelar-edicao">
                                Cancelar
                            </Button>
                            <Button onClick={handleConfirmEdit} className="btn-confirmar-edicao">
                                Confirmar edição
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => setIsEditing(true)} className="btn-editar-enderecoDoador">
                                Editar
                            </Button>
                            <Button onClick={() => navigate("/categoriaDoacao", { state: { id: enderecoEnvi.id } })} className="btn-confirmar-enderecoDoador">
                                Confirmar
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default FormEnderecoDoador;
