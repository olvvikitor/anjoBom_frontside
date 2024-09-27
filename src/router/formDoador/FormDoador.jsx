import React, { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import axios from "axios";
import Swal from 'sweetalert2'
import * as EmailValidator from 'email-validator';


import {
    Container,
    Segment,
    Grid,
    BreadcrumbSection,
    BreadcrumbDivider,
    Breadcrumb,
    Label,
    Divider,
    Header,
    FormField,
    Button,
    Checkbox,
    Form,
    FormInput,
    FormGroup,
    FormTextArea,
    Icon,
    TextArea,
    MessageHeader,
    Message,
    TransitionGroup

} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import "./FormDoador.css"
import HeaderT from "../../components/Header";
import { Link } from "react-router-dom";


function FormDoador() {


    const [stepFormContact, setStepFormContact] = useState(true);
    const [stepFormAndress, setStepFormAndress] = useState(false);
    const [stepVerification, setStepVerification] = useState(false);
    const [msgCodigo, setMsgCodigo] = useState(false);
    const [recebidoCodigo, setRecebidoCodigo] = useState('');



    const [erros, setErros] = useState({
        address: {
            cep: "",
            // outros campos de erro do endereço, se necessário
        },
    });
    const [errorCep, setErrorCep] = useState(""); // Para o erro de CEP


    // Estado para armazenar os valores dos inputs
    const [formValues, setFormValues] = useState({
        name: '',
        last_name: '',
        email: '',
        phone: '',
        motivation: '',
        address: {
            cep: '',
            estado: '',
            cidade: '',
            bairro: '',
            rua: '',
            numero: ''
        },

    });

    const [codigo, setCodigo] = useState({
        codigoVerificacao: ''
    })
    const [todosDados, setTodosDados] = useState([])
    const [todoCodigo, setTodoCodigo] = useState([])

    const formatCEP = (cep) => {
        const cleaned = ('' + cep).replace(/\D/g, ''); // Remove qualquer caractere não numérico

        // Aplica a máscara para CEP no formato "99999-999"
        const match = cleaned.match(/^(\d{5})(\d{3})$/);
        if (match) {
            return `${match[1]}-${match[2]}`;
        }
        return cleaned;
    }
    const validateCep = async (value) => {
        if (!value) {
            setErrorCep("CEP é obrigatório");
            return;
        }

        if (value.length > 9) {
            setErrorCep("Máximo 9 caracteres");
            return;
        }

        try {
            const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
            if (response.data && !response.data.erro) {
                // Se o CEP for válido
                setFormValues((prevState) => ({
                    ...prevState,
                    address: {
                        ...prevState.address,
                        rua: response.data.logradouro,
                        bairro: response.data.bairro,
                        cidade: response.data.localidade,
                        estado: response.data.uf,
                    },
                }));
                setErrorCep(""); // Limpa o erro se for válido
            } else {
                setErrorCep("CEP inválido"); // Atualiza o erro se o CEP for inválido
            }
        } catch (error) {
            console.error("Erro ao buscar o CEP:", error);
            // setErrorCep("Erro ao buscar o CEP"); // Atualiza com mensagem de erro
        }
    };



    const formatPhone = (phone) => {
        const cleaned = ('' + phone).replace(/\D/g, ''); // Remove todos os caracteres não numéricos

        // Primeiro caso: para números no formato (99) 9 9999-9999
        const match = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
        }

        // Segundo caso: para números no formato (99) 9999-9999
        const matchTenDigits = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
        if (matchTenDigits) {
            return `(${matchTenDigits[1]}) ${matchTenDigits[2]}-${matchTenDigits[3]}`;
        }

        return cleaned; // Retorna o número sem formatação, caso não seja válido
    };


    useEffect(() => {
        console.log("Aqui são os dados atualizados", todosDados);
    }, [todosDados]); // Este useEffect é chamado sempre que todosDados muda

    useEffect(() => {
        console.log("Aqui são os codigo atualizados", todoCodigo);
    }, [todoCodigo]); // Este useEffect é chamado sempre que todosDados muda


    // Função para atualizar os valores conforme o usuário digita
    const handleChange = async (e) => {
        const { name, value } = e.target;


        // Verifica se o campo que está sendo alterado é o CEP
        if (name.startsWith('address.cep')) {
            const field = name.split('.')[1];
            setFormValues((prevState) => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [field]: formatCEP(value) // Aplica a formatação ao CEP
                }
            }));

            // Se o CEP tiver o tamanho certo (geralmente 8 caracteres), faz a requisição para a API
            if (value.length === 8) {
                validateCep(value); // Chame a função de validação do CEP

            }

        } else if (name.startsWith('address.')) {
            const field = name.split('.')[1];
            setFormValues((prevState) => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [field]: value
                }
            }));
        } else if (name === 'phone') {
            setFormValues({ ...formValues, [name]: formatPhone(value) });
        } else if (name === 'codigoVerificacao') {
            setCodigo({
                [name]: value
            })
        } else {
            setFormValues({
                ...formValues,
                [name]: value
            });

        }


        setErros(prevState => {
            const newErros = { ...prevState };
            switch (name) {
                case "name":
                    if (value.length > 29) {
                        newErros.name = "Máximo 30 caracteres";
                    } else {
                        newErros.name = "";
                    }
                    break;
                case "last_name":
                    if (value.length > 59) {
                        newErros.last_name = "Máximo 60 caracteres";
                    } else {
                        newErros.last_name = "";
                    }
                    break;
                case "phone":
                    if (value.length > 15) {
                        newErros.phone = "Máximo 15 caracteres";
                    } else {
                        newErros.phone = "";
                    }
                    break;
                case "email":
                    if (value.length > 44) {
                        newErros.email = "Máximo 45 caracteres";
                    } else {
                        newErros.email = "";
                    }
                    break;
                case "motivation":
                    if (value.length > 99) {
                        newErros.motivation = "Máximo 100 caracteres";
                    } else {
                        newErros.motivation = "";
                    }
                    break;
                case "address.cep":
                    if (value.length > 9) {
                        if (!newErros.address) newErros.address = {};
                        newErros.address.cep = "Máximo 9 caracteres";
                    } else {
                        if (newErros.address) delete newErros.address.cep;
                        if (Object.keys(newErros.address || {}).length === 0) delete newErros.address;
                    }
                    break;
                case "address.rua":
                    if (value.length > 29) {
                        if (!newErros.address) newErros.address = {};
                        newErros.address.rua = "Máximo 30 caracteres";
                    } else {
                        if (newErros.address) delete newErros.address.rua;
                        if (Object.keys(newErros.address || {}).length === 0) delete newErros.address;
                    }
                    break;
                case "address.estado":
                    if (value.length > 2) {
                        if (!newErros.address) newErros.address = {};
                        newErros.address.estado = "Máximo 2 caracteres";
                    } else {
                        if (newErros.address) delete newErros.address.estado;
                        if (Object.keys(newErros.address || {}).length === 0) delete newErros.address;
                    }
                    break;
                case "address.cidade":
                    if (value.length > 29) {
                        if (!newErros.address) newErros.address = {};
                        newErros.address.cidade = "Máximo 30 caracteres";
                    } else {
                        if (newErros.address) delete newErros.address.cidade;
                        if (Object.keys(newErros.address || {}).length === 0) delete newErros.address;
                    }
                    break;
                case "address.bairro":
                    if (value.length > 29) {
                        if (!newErros.address) newErros.address = {};
                        newErros.address.bairro = "Máximo 30 caracteres";
                    } else {
                        if (newErros.address) delete newErros.address.bairro;
                        if (Object.keys(newErros.address || {}).length === 0) delete newErros.address;
                    }
                    break;
                case "address.numero":
                    if (value.length > 6) {
                        if (!newErros.address) newErros.address = {};
                        newErros.address.numero = "Máximo 6 caracteres";
                    } else {
                        if (newErros.address) delete newErros.address.numero;
                        if (Object.keys(newErros.address || {}).length === 0) delete newErros.address;
                    }
                    break;
                default:
                    break;
            }

            return newErros;
        });
    };


    

    function voltarParaContato() {
        setStepFormContact(true);
        setStepFormAndress(false);
    }

    function irParaEndereco() {
        let valid = true; // Inicializamos como verdadeiro e vamos alterar caso haja erros
        let newErros = {};

        // Verifica se o nome está vazio
        if (!formValues.name) {
            newErros.name = "Nome é obrigatório";
            valid = false;
        }
        if (!formValues.last_name) {
            newErros.last_name = "Sobrenome é obrigatório";
            valid = false;
        }
        if (!formValues.phone) {
            newErros.phone = "Telefone é obrigatório";
            valid = false;
        }

        if (!formValues.email) {
            newErros.email = "E-mail é obrigatório";
            valid = false;
        }
        if (!formValues.motivation) {
            newErros.motivation = "Motivação é obrigatório";
            valid = false;
        }

        if (formValues.email) {
            const isValid = EmailValidator.validate(formValues.email);
            if (!isValid) {
                newErros.email = "Email é inválido";
                valid = false;
            }
        }
        // Se válido, vai para o endereço
        if (valid) {
            setStepFormAndress(true);
            setStepFormContact(false);
        } else {
            setStepFormContact(true); // Mantém na etapa de contato
        }

        // Atualiza os erros
        setErros(newErros);
    }


    function voltarParaEndereco() {
        setStepVerification(false);
        setStepFormAndress(true);
    }

    function irParaVerificacao() {
        let valid = true;
        let newErros = {};

        // Validação dos campos fora do endereço

        // Validação dos campos dentro de `address`
        if (!formValues.address.cep) {
            newErros.address = { cep: "CEP é obrigatório" };
            valid = false;
        }
        if (!formValues.address.estado) {
            newErros.address = { ...newErros.address, estado: "Estado é obrigatório" };
            valid = false;
        }
        if (!formValues.address.cidade) {
            newErros.address = { ...newErros.address, cidade: "Cidade é obrigatória" };
            valid = false;
        }
        if (!formValues.address.bairro) {
            newErros.address = { ...newErros.address, bairro: "Bairro é obrigatório" };
            valid = false;
        }
        if (!formValues.address.rua) {
            newErros.address = { ...newErros.address, rua: "Rua é obrigatória" };
            valid = false;
        }
        if (!formValues.address.numero) {
            newErros.address = { ...newErros.address, numero: "Número é obrigatório" };
            valid = false;
        }



        // Se válido, vai para o endereço
        if (valid) {
            setStepFormAndress(false);
            setStepVerification(true);
        } else {
            setStepFormAndress(true); // Mantém na etapa de endereço
        }

        // Atualiza os erros
        setErros(newErros);

    }

    async function enviarCodigo() {

        setMsgCodigo(true)
        try {
            const response = await axios.get('http://localhost:5000/person/code/ ')
            console.log("resposta ", response.data);
            setRecebidoCodigo(response.data);

            console.log("novo ", recebidoCodigo);


        } catch (error) {

        }

    }

    async function enviarFormulario() {
        console.log("Dados do formulário:", formValues);
        let valid = true;
        let newErros = {};


        if (codigo.codigoVerificacao === '') {
            newErros = { codigoVerificacao: "Código é obrigatório" };
            valid = false;
        }

        if (recebidoCodigo === codigo.codigoVerificacao) {
            valid = true;
            console.log("entrou no valid TRUE")
        } else {
            valid = false;
            Swal.fire({
                title: "Error!",
                text: "O código não é compatível!",
                icon: "error",
                customClass: {
                    confirmButton: 'swal2-confirm-custom'
                }

            });
        }

        if (valid) {
            try {
                // Envia os dados para o backend via POST usando Axios
                const response = await axios.post('http://localhost:5000/person/', formValues, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // Verifica se a resposta foi bem-sucedida
                if (response.status === 200) {
                }

                // Exibe o SweetAlert para sucesso
                Swal.fire({
                    title: "Parabéns!",
                    text: "Você agora é um doador!",
                    icon: "success",
                    customClass: {
                        confirmButton: 'swal2-confirm-custom'
                    }

                });
                console.log('Resposta do servidor:', response.data);

                // Limpa o formulário após o envio
                setFormValues({
                    name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    motivation: '',
                    address: {
                        cep: '',
                        estado: '',
                        cidade: '',
                        bairro: '',
                        rua: '',
                        numero: ''
                    }
                });
                setCodigo({
                    codigoVerificacao: ''
                })
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    Swal.fire({
                        title: "Temos um pequeno problema!",
                        text: "O email ou telefone já está cadastrado.",
                        icon: "error",
                        customClass: {
                            confirmButton: 'swal2-confirm-custom'
                        }

                    });
                } else {
                    Swal.fire({
                        title: "Erro",
                        text: "Erro ao enviar dados para o servidor.",
                        icon: "error",
                        customClass: {
                            confirmButton: 'swal2-confirm-custom'
                        }

                    });
                }
                console.error('Erro ao enviar os dados:', error);
            }
        }



        // Atualiza os erros
        setErros(newErros);


    }


    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <>

            <HeaderT title1={"Torne-se"} title2={"Doador"} />

            <div className="container-formulario">

                {/* Step formulario Contato*/}


                {stepFormContact ?
                    <div className="wizard-form">
                        <header className="wizard-header">
                            {isMobile ?
                                /*Modo mobile para Step Contato */
                                <div>
                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Label circular className="color-label-circle-active">1</Label>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">2</Label>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">3</Label>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider horizontal>
                                        <Header as='h4' className="header-form">
                                            Contato
                                        </Header>
                                    </Divider>
                                </div>

                                /*Modo computador para Step Contato */

                                : <div>

                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Label circular className="color-label-circle-active">1</Label>
                                            <BreadcrumbSection>Contato</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">2</Label>
                                            <BreadcrumbSection >Endereço</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">3</Label>
                                            <BreadcrumbSection >Verificação</BreadcrumbSection>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider inverted />
                                </div>
                            }
                        </header>

                        <main className="wizard-main">
                            <Form>
                                <div className="form-inputs">
                                    {/* Inputs dinâmicos de cada etapa */}
                                    <FormGroup widths={"equal"}>
                                        <FormInput
                                            fluid
                                            error={!!erros.name && { content: erros.name }}
                                            label={<label className="blue-label">Nome</label>}
                                            placeholder="Digite seu nome"
                                            name="name"
                                            type="text"
                                            maxLength={30}
                                            value={formValues.name}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            fluid
                                            error={!!erros.last_name && { content: erros.last_name }}
                                            label={<label className="blue-label">Sobrenome</label>}
                                            placeholder="Digite seu sobrenome"
                                            name="last_name"
                                            type="text"
                                            maxLength={60}
                                            value={formValues.last_name}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup widths={"equal"}>
                                        <FormInput
                                            icon='phone'
                                            iconPosition='left'
                                            fluid
                                            error={!!erros.phone && { content: erros.phone }}
                                            label={<label className="blue-label">Telefone</label>}
                                            placeholder="Digite seu telefone"
                                            name="phone"
                                            maxLength={15}
                                            value={formValues.phone}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            icon='mail'
                                            iconPosition='left'
                                            fluid
                                            error={!!erros.email && { content: erros.email }}
                                            label={<label className="blue-label">E-mail</label>}
                                            placeholder="Digite seu e-mail"
                                            name="email"
                                            maxLength={45}
                                            value={formValues.email}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <FormTextArea

                                        fluid
                                        error={!!erros.motivation && { content: erros.motivation }}
                                        label={<label className="blue-label">Motivação</label>}
                                        placeholder="Descreva sua motivação"
                                        name="motivation"
                                        maxLength={100}
                                        value={formValues.motivation}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Form>
                        </main>

                        <footer className="wizard-footer">
                            <Button type='submit' className="btn-internal-forms-back">
                                <Link to='/agendaDoacao'>
                                    voltar
                                </Link>
                            </Button>
                            <Button type='submit' className="btn-internal-forms-continous" onClick={irParaEndereco}>Continuar</Button>
                        </footer>
                    </div>

                    : null
                }


                {/* Step formulario endereço*/}


                {stepFormAndress ?
                    <div className="wizard-form">
                        <header className="wizard-header">
                            {isMobile ?
                                /*Modo mobile para Step Endereço */
                                <div>
                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle-active">2</Label>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">3</Label>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider horizontal>
                                        <Header as='h4' className="header-form">
                                            Endereço
                                        </Header>
                                    </Divider>
                                </div>

                                /*Modo computador para Step Endereço */

                                : <div>

                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbSection>Contato</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle-active">2</Label>
                                            <BreadcrumbSection >Endereço</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">3</Label>
                                            <BreadcrumbSection >Verificação</BreadcrumbSection>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider inverted />
                                </div>
                            }
                        </header>

                        <main className="wizard-main">
                            <Form>
                                <div className="form-inputs">
                                    {/* Inputs dinâmicos de cada etapa */}
                                    <FormInput
                                        fluid
                                        error={!!errorCep || (erros.address && erros.address.cep) ? { content: errorCep || erros.address.cep } : null}

                                        // error={!!(erros.address && erros.address.cep) && { content: erros.address.cep }}
                                        label={<label className="blue-label">CEP</label>}
                                        placeholder="Digite seu CEP"
                                        name="address.cep"
                                        type="text"
                                        maxLength={9}
                                        value={formValues.address.cep}
                                        onChange={handleChange}
                                    />
                                    <FormGroup widths="equal">
                                        <FormInput
                                            fluid
                                            error={!!(erros.address && erros.address.estado) && { content: erros.address.estado }}
                                            label={<label className="blue-label">Estado</label>}
                                            placeholder="Digite seu estado"
                                            name="address.estado"
                                            type="text"
                                            maxLength={2}
                                            value={formValues.address.estado}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            fluid
                                            error={!!(erros.address && erros.address.cidade) && { content: erros.address.cidade }}
                                            label={<label className="blue-label">Cidade</label>}
                                            placeholder="Digite sua cidade"
                                            name="address.cidade"
                                            type="text"
                                            maxLength={30}
                                            value={formValues.address.cidade}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            fluid
                                            error={!!(erros.address && erros.address.bairro) && { content: erros.address.bairro }}
                                            label={<label className="blue-label">Bairro</label>}
                                            placeholder="Digite seu bairro"
                                            name="address.bairro"
                                            type="text"
                                            maxLength={30}
                                            value={formValues.address.bairro}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup widths="equal">
                                        <FormInput
                                            fluid
                                            error={!!(erros.address && erros.address.rua) && { content: erros.address.rua }}
                                            label={<label className="blue-label">Rua</label>}
                                            placeholder="Digite sua rua"
                                            name="address.rua"
                                            type="text"
                                            maxLength={30}
                                            value={formValues.address.rua}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            fluid
                                            error={!!(erros.address && erros.address.numero) && { content: erros.address.numero }}
                                            label={<label className="blue-label">Número</label>}
                                            placeholder="Digite o número de sua residência"
                                            name="address.numero"
                                            type="text"
                                            maxLength={6}
                                            value={formValues.address.numero}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                </div>
                            </Form>
                        </main>

                        <footer className="wizard-footer">
                            <Button type='submit' className="btn-internal-forms-back" onClick={voltarParaContato}>Voltar</Button>
                            <Button type='submit' className="btn-internal-forms-continous" onClick={irParaVerificacao}>Continuar</Button>
                        </footer>
                    </div>

                    : null
                }


                {/* Step formulario Verificação*/}

                {stepVerification ?
                    <div className="wizard-form">
                        <header className="wizard-header">
                            {isMobile ?
                                /*Modo mobile para Step Verificação */
                                <div>
                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle-active">3</Label>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider horizontal>
                                        <Header as='h4' className="header-form">
                                            Verificação
                                        </Header>
                                    </Divider>
                                </div>

                                /*Modo computador para Step Verificação */

                                : <div>

                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbSection>Contato</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbSection >Endereço</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle-active">3</Label>
                                            <BreadcrumbSection >Verificação</BreadcrumbSection>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider inverted />
                                </div>
                            }
                        </header>

                        <main className="wizard-main">
                            <Form>
                                <div className="form-inputs">
                                    {/* Inputs dinâmicos de cada etapa */}
                                    <FormInput
                                        fluid
                                        error={!!erros.codigoVerificacao && { content: erros.codigoVerificacao }}
                                        label={<label className="blue-label">Código de verificação</label>}
                                        placeholder="Digite o código de verificação"
                                        name="codigoVerificacao"
                                        type="text"
                                        maxLength={20}
                                        value={codigo.codigoVerificacao}
                                        onChange={handleChange}
                                    />
                                    {msgCodigo ?
                                        <p className="msg-codigo-verificacao">
                                            Um código foi enviado para o número <b>{formValues.phone}</b>.
                                        </p>
                                        :
                                        null}

                                    <button type="submit" className="btn-enviar-codigo" onClick={enviarCodigo} >Enviar código</button>
                                    <div className="div-nao-recebeu-codigo">
                                        <p>Não recebeu o código?</p>
                                        <p className="reenviar-codigo">Clique aqui para reenviar</p>
                                    </div>
                                    <Checkbox
                                        label={
                                            <label>Ao aceitar, você concorda com os Termos de Uso e
                                                Política de Privacidade do site
                                            </label>
                                        }
                                        defaultChecked
                                    />

                                </div>
                            </Form>
                        </main>

                        <footer className="wizard-footer">
                            <Button type='submit' className="btn-internal-forms-back" onClick={voltarParaEndereco}>Voltar</Button>
                            <Button type='submit' className="btn-internal-forms-continous" onClick={enviarFormulario}>Enviar</Button>
                        </footer>
                    </div>

                    : null
                }


            </div>

        </>
    )
}

export default FormDoador;