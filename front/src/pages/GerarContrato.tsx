import React, { useState } from 'react';
import styled from 'styled-components';
import { jsPDF } from 'jspdf';
import { logoBase64 } from '../base64/logoBase64';
import { logoBase64versao2 } from '../base64/logoBase64versao2';
import { useNavigate } from 'react-router-dom';
import DAFFI from "../images/DAFFI logo.jpg"
import LogoutButton from '../components/LogoutButton';
// Definição de estilos para o formulário e exibição do contrato
// Estilos do componente
const FormWrapper = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Sidebar = styled.div`
  width: 80px; /* Largura inicial da barra lateral */
  height: 100vh; /* Faz a barra ocupar toda a altura da tela */
  background-color: #000000;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow: auto;
  position: fixed; /* Fixa a barra na lateral */
  top: 0; /* Garante que comece do topo */
  left: 0; /* Garante que esteja à esquerda */
  transition: width 0.3s ease; /* Animação para expandir suavemente */
  
  &:hover {
    width: 110px; /* Largura ao passar o mouse */
  }
`;

const SidebarItem = styled.div`
  margin: 10px 0;
  cursor: pointer;
  white-space: nowrap; /* Evita quebra de texto */
  overflow: hidden; /* Oculta texto excedente */
  text-overflow: ellipsis; /* Mostra "..." para texto cortado */
  padding: 10px;
  transition: background-color 0.2s;


  &:hover {
    background-color: #34495e;
    border-radius: 5px;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 0;
  padding: 10px;
  margin-left: 115px;

  img {
    max-width: 20%;
    height: auto;
    display: block;
  }

  @media (max-width: 768px) {
    img {
      max-width: 20%;
    }
  }

  @media (max-width: 480px) {
    img {
      max-width: 20%;
    }
  }
`;

const Header = styled.h1`
  margin-top: 50px;
  color: #333;
  text-align: center;
  font-size: medium;

  @media (max-width: 768px) {
    font-size: medium;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 90px; /* Adiciona espaço para o conteúdo ao lado da barra lateral */
  overflow-y: auto;
`;

const MainWrapper = styled.div`
  display: flex;
  flex: 1;
  font-family: sans-serif;
  font-size: medium;

  @media (max-width: 768px) {
    padding: 15px; /* Menos padding em telas menores */
    font-size: small;
  }

  @media (max-width: 480px) {
    padding: 10px; /* Menos padding em telas muito pequenas */
    font-size: small;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  margin-right: 10px;
`;

const NavegarButton = styled.button`
`;

const ContractWrapper = styled.pre`
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  white-space: pre-wrap;
  font-family: 'Courier New', Courier, monospace;
`;

const GerarContrato: React.FC = () => {
const navigate = useNavigate();
  const [empresaInfo, setEmpresaInfo] = useState({
    contratada: '',
    cnpjContratada: '',
    enderecoContratada: '',
    inscricaoMunicipal: '',
    responsavelContratada: '',

    contratante: '',
    cnpjContratante: '',
    enderecoContratante: '',
    responsavelContratante: '',
    rgRepresentante: '',
    cpfRepresentante: '',

    valorTotal: 0,
    valorEntrada: 0,
    valorSaldoRestante: 0,
    valorParcelas: 0,
    previsaoInicio: '',
    prazoExecucao: 0,
  });

  const [contratoGerado, setContratoGerado] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpresaInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const formatarPreco = (valor: number) => {
  //   return valor.toLocaleString('pt-BR', {
  //     style: 'currency',
  //     currency: 'BRL',
  //   });
  // };
  
  const handleGenerateContract = () => {
    const contrato = `

    Na condição de CONTRATADA a empresa Alan Alves dos Santos Me estabelecida a rua Giovanni
    Castagneto, 144 – Villa Branca, Jacareí – SP, inscrita no CNPJ 18 158 765/000-10 com inscrição 
    municipal de número 62667 neste ato representado por Alan Alves dos Santos CPF 307 901 418 92 
    RG 34 500 304 – 4 com endereço supracitado.
    Na condição de CONTRATANTE, a pessoa jurídica Sr(a) ${empresaInfo.contratante}, portador do CNPJ ${empresaInfo.cnpjContratante} sediado na ${empresaInfo.enderecoContratante},
    representado pelo Sr(a). ${empresaInfo.responsavelContratante}, brasileiro, portador do RG nº ${empresaInfo.rgRepresentante}, inscrito 
    no CPF sob o nº ${empresaInfo.cpfRepresentante}.

    1 – Objeto do contrato.
      ● Prestação de Serviço, com fornecimento de Mão de Obra e materiais, para os serviços mencionados
      conforme planilha orçamentária.
      ● Anexo Planilha Orçamentária.

    2 - DA RESPONSABILIDADE DA CONTRATADA
      ● Fornecimento de Mão de obra Especializada;
      ● Fornecimento dos materiais necessários.
      ● Fornecimento de transporte e Refeição para seus Funcionários.
      ● Fornecimento de Uniformes, EPIs.

    3 – DA RESPONSABILIDADE DO CONTRATANTE.
      ● Fornecimento de ponto de energia.
      ● Fornecimento de ponto de Água.
      ● Aprovações legais junta a prefeitura.
      ● Projeto Estrutural.
      ● Preposto para acompanhamento da obra, com poder de decisão, caso seja necessário alteração ou
      aplicação de detalhes do conjunto.

    4 – DO PRAZO DE EXECUÇÃO DA OBRA.
      ● A obra será executada no prazo de ${empresaInfo.prazoExecucao} dias úteis, podendo este ser prorrogado por mais dias úteis,
      por forças maiores da natureza.
      ● Nos casos de paralisação da obra, por situações de terceiro (Alteração de projetos e outros) os dias
      paralisados, serão creditados ao prazo final de entrega da obra.

    5 – DO PRAZO DE INÍCIO DA OBRA.
      ● A previsão de início da obra, está programada para ${empresaInfo.previsaoInicio}.

    6 – DO VALOR TOTAL DO CONTRATO
      ● Valor final dos serviços. R$ ${empresaInfo.valorTotal}

    7 – DA CONDIÇÃO DE PAGAMENTO.
      ● 40% de entrada no valor de R$ ${empresaInfo.valorEntrada} e o saldo no valor de R$ ${empresaInfo.valorSaldoRestante} dividido em 2
      parcelas de 30% cada no valor de ${empresaInfo.valorParcelas} até a conclusão da obra.
      ● Dados Bancários:
      Banco Itaú, Agência: 0240, Conta Corrente: 27426 – 6, Favorecido: Alan Alves dos Santos ME

    8 – ALTERAÇÕES DE SERVIÇOS
      ● Caso queira o cliente alterar o projeto em andamento, acrescentando itens não considerados neste
      contrato, será executado pelo contratado, orçamento referente à alteração e colocado ao cliente o
      custo avaliado e tendo sido aprovado pelo mesmo, será executada a etapa modificada.
      ● Havendo alteração do projeto e serviços adicionais, o tempo de execução da alteração do projeto
      será acrescido ao prazo de entrega da obra.

    9 – DO REAJUSTE.
      ● Os serviços descritos não sofrerão reajustes até a sua conclusão final.

    10 – DO PROJETO EXISTENTE.
      ● Será respeitado pela contratada, o projeto original e caso haja necessidade de alterações em sua
      configuração por motivos, estruturais, de acabamentos ou outros, será previamente comunicado ao
      contratante, bem como a (Arquiteto/ engenheiro responsável)
      ● Esta atitude é para que seja sempre preservada a característica do imóvel existente.

    11 – DAS GARANTIAS DE OBRA.
      ● Materiais de acabamento: De acordo com fabricante.
      ● Estrutural: Conforme normas vigentes, observando que o Projeto Estrutural será fornecido pelo
      contratante, devendo a contratada se responsabilizar por total execução na conformidade do
      referido Projeto.
      ● Serviços diversos de instalação e construção: De acordo com as normas vigentes.

    12 – DO ATRASO NA ENTREGA DA OBRA
      ● Havendo pela contratada, atraso superior a 30 dias do prazo da entrega da obra, será aplicado pelo
      contratante, multa de 2% no valor total do contrato.
      ● Não sendo respeitado pela contratada o prazo de 30 dias, será retido o valor da parcela final, para
      que ajustes possam ser feitos na obra e sua conclusão.

    13 - RESCISÃO
    O presente Contrato poderá ser rescindido nas seguintes circunstâncias:
      ● A qualquer tempo, em caso de infração ou inadimplência às suas cláusulas e condições,
      independentemente de interpelação judicial ou extrajudicial, assim como em caso de pedido de
      recuperação judicial, extrajudicial e/ou falência da Contratada, nos termos da Lei nº 11.101, de
      09/02/2005;
      ● Por interesse do contratante, a qualquer tempo, mediante aviso formal à contratada com (15) dias
      de antecedência, sujeita à multa correspondente a 2 % (dois por cento) do saldo do valor do
      Contrato.

      Estando as partes de acordo com este contrato de prestação de serviço, assinam este documento em
      duas vias de igual teor


      Contratado
      Daffi Construções
      CNPJ: 18.158.765/0001-10
      Responsável: Alan Alves dos Santos – RG 34.500.304–4

      ASS:________________________________________

      Contratante
      ${empresaInfo.contratante}
      CNPJ ${empresaInfo.cnpjContratante}
      Responsável: ${empresaInfo.responsavelContratante} – RG ${empresaInfo.rgRepresentante}

      ASS:________________________________________

      Testemunha

      Nome:________________________________________
      RG:

    
      Jacareí, 17 de Dezembro de 2024
    `;
    setContratoGerado(contrato);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const marginLeft = 14;
    const pageWidth = 195; // Largura disponível para texto
    const lineHeight = 5.5; // Altura de cada linha
    const pageHeight = 287; // Altura útil da página
    let currentHeight = 51; // Posição inicial do texto na primeira página
    const adjustedMarginLeft = marginLeft + 4.5; // Ajuste o valor conforme necessário

  
    // Adiciona o logotipo
    doc.addImage(logoBase64, 'PNG', 20, 10, 32, 32);
    doc.addImage(logoBase64versao2, 'PNG', 60, 10, 125, 29); // Coordenadas x=50, y=10 (à direita da primeira)
    doc.setFont('Calibri', 'bold');
    doc.setFontSize(14);
    doc.text('Contrato de empreita global de serviço n° 06/2024', adjustedMarginLeft, 52);

    // Configura fonte para o corpo do contrato
    doc.setFont('Calibri', 'normal');
    doc.setFontSize(12);
  
    // Define o texto com substituição de bullet points
  const contratoGeradoComBullets = contratoGerado.replace(/●/g, '-'); // Substitui o bullet por um traço "-"

  // Divide o texto em linhas para encaixar na largura
  const lines = doc.splitTextToSize(contratoGeradoComBullets, pageWidth);
  
    lines.forEach((line: string | string[]) => {
      if (currentHeight + lineHeight > pageHeight) {
        doc.addPage(); // Adiciona nova página se ultrapassar altura
        currentHeight = 20; // Redefine a altura inicial para a nova página
      }
      doc.text(line, marginLeft, currentHeight);
      currentHeight += lineHeight;
    });
  
    // Adiciona número de páginas no rodapé
    // const totalPages = doc.getNumberOfPages(); // Corrigido aqui
    // for (let i = 1; i <= totalPages; i++) {
    //   doc.setPage(i);
    //   doc.setFontSize(10);
    //   doc.text(`Página ${i} de ${totalPages}`, marginLeft, pageHeight - 10);
    // }
  
    // Salva o arquivo
    doc.save('contrato.pdf');
  };

  return (
    <>
    <MainWrapper> 
        {/* Barra Lateral */}
        <Sidebar>
          <SidebarItem onClick={() => navigate('/orcamentos')}>Orçamentos</SidebarItem>
          <SidebarItem onClick={() => navigate('/gerar-contrato')}>Contratos</SidebarItem>
          <SidebarItem onClick={() => navigate('/relatorios')}>Relatórios</SidebarItem>
          <SidebarItem>      <LogoutButton />
          </SidebarItem>
        </Sidebar>
         {/* Conteúdo Principal */}
         <Content>
         <Header>
        <ImageContainer>
          <img src={DAFFI} alt="Logo DAFFI" />
        </ImageContainer>
        Gerar Contrato
      </Header>      

    <FormWrapper>
      {/* <Input
        type="text"
        name="contratada"
        placeholder="Nome da Contratada"
        value={empresaInfo.contratada}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="cnpjContratada"
        placeholder="CNPJ da Contratada"
        value={empresaInfo.cnpjContratada}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="enderecoContratada"
        placeholder="Endereço da Contratada"
        value={empresaInfo.enderecoContratada}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="inscricaoMunicipal"
        placeholder="Inscrição Municipal da Contratada"
        value={empresaInfo.inscricaoMunicipal}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="responsavelContratada"
        placeholder="Responsável pela Contratada"
        value={empresaInfo.responsavelContratada}
        onChange={handleChange}
      /> */}



      <Input
        type="text"
        name="contratante"
        placeholder="Nome da Contratante"
        value={empresaInfo.contratante}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="cnpjContratante"
        placeholder="CNPJ da Contratante"
        value={empresaInfo.cnpjContratante}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="enderecoContratante"
        placeholder="Endereço da Contratante"
        value={empresaInfo.enderecoContratante}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="responsavelContratante"
        placeholder="Responsável pela Contratante"
        value={empresaInfo.responsavelContratante}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="rgRepresentante"
        placeholder="RG do Representante"
        value={empresaInfo.rgRepresentante}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="cpfRepresentante"
        placeholder="CPF do Representante"
        value={empresaInfo.cpfRepresentante}
        onChange={handleChange}
      />



      <Input
        type="number"
        name="valorTotal"
        placeholder="Valor Total do Contrato"
        value={empresaInfo.valorTotal}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="valorEntrada"
        placeholder="Valor de Entrada"
        value={empresaInfo.valorEntrada}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="valorSaldoRestante"
        placeholder="Valor do Saldo Restante"
        value={empresaInfo.valorSaldoRestante}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="valorParcelas"
        placeholder="Valor das Parcelas"
        value={empresaInfo.valorParcelas}
        onChange={handleChange}
      />



      
      <Input
        type="date"
        name="previsaoInicio"
        placeholder="Previsão de Início"
        value={empresaInfo.previsaoInicio}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="prazoExecucao"
        placeholder="Prazo de Execução (em dias)"
        value={empresaInfo.prazoExecucao}
        onChange={handleChange}
      />

      <Button onClick={handleGenerateContract}>Gerar Contrato</Button>
      <Button onClick={handleDownloadPDF}>Baixar PDF</Button>
      <ContractWrapper>
          <h3>Pré-visualização do Contrato</h3>
          {contratoGerado}
        </ContractWrapper>

        <NavegarButton onClick={() => navigate('/orcamentos')}>Orçamentos</NavegarButton>
        
        <LogoutButton/>
    </FormWrapper>    
    </Content>
    </MainWrapper>
    </>
  );
};

export default GerarContrato;